import { Pool } from "pg";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const limitArg = args.find((arg) => arg.startsWith("--limit="));
const limit = Number(limitArg?.split("=")[1] ?? process.env.RESCUEGROUPS_IMPORT_LIMIT ?? 12);

const apiKey = process.env.RESCUEGROUPS_API_KEY;
const baseUrl = (process.env.RESCUEGROUPS_API_BASE ?? "https://api.rescuegroups.org/v5").replace(/\/$/, "");
const databaseUrl = process.env.DATABASE_URL;
const endpoint = new URL(`${baseUrl}/public/animals/search/available/dogs/`);

endpoint.searchParams.set("limit", String(Number.isFinite(limit) && limit > 0 ? limit : 12));
endpoint.searchParams.set("include", "orgs,pictures");

if (!apiKey) {
  throw new Error("RESCUEGROUPS_API_KEY is required.");
}

if (!dryRun && !databaseUrl) {
  throw new Error("DATABASE_URL is required unless you run with --dry-run.");
}

const response = await fetch(endpoint, {
  headers: {
    Authorization: apiKey,
    "Content-Type": "application/vnd.api+json",
  },
});

if (!response.ok) {
  throw new Error(`RescueGroups request failed: ${response.status} ${response.statusText}`);
}

const payload = await response.json();
const included = Array.isArray(payload.included) ? payload.included : [];
const includedMap = new Map(included.map((item) => [`${item.type}:${item.id}`, item]));
const animals = Array.isArray(payload.data) ? payload.data : [];

const normalized = animals.map((animal) => normalizeAnimal(animal, includedMap));

if (dryRun) {
  console.log(JSON.stringify({
    mode: "dry-run",
    fetched: normalized.length,
    sample: normalized.slice(0, 2),
  }, null, 2));
  process.exit(0);
}

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: databaseUrl.includes("localhost") ? false : { rejectUnauthorized: false },
});

const client = await pool.connect();

try {
  await client.query("begin");

  const importRun = await client.query(
    `
      insert into pet_import_runs (source_name, status, notes)
      values ($1, $2, $3)
      returning id
    `,
    ["rescuegroups", "running", `Import requested for ${normalized.length} dogs`],
  );

  const importRunId = importRun.rows[0].id;

  for (const item of normalized) {
    await client.query(
      `
        insert into shelter_organizations (id, name, city, state, integration_type, url)
        values ($1, $2, $3, $4, $5, $6)
        on conflict (id) do update set
          name = excluded.name,
          city = excluded.city,
          state = excluded.state,
          integration_type = excluded.integration_type,
          url = excluded.url
      `,
      [
        item.shelter.id,
        item.shelter.name,
        item.shelter.city,
        item.shelter.state,
        item.shelter.integrationType,
        item.shelter.url,
      ],
    );

    await client.query(
      `
        insert into shelter_pets (id, shelter_id, profile)
        values ($1, $2, $3::jsonb)
        on conflict (id) do update set
          shelter_id = excluded.shelter_id,
          profile = excluded.profile
      `,
      [item.id, item.shelter.id, JSON.stringify(stripShelter(item))],
    );
  }

  await client.query(
    `
      update pet_import_runs
      set status = $2,
          pets_imported = $3,
          notes = $4
      where id = $1
    `,
    [importRunId, "completed", normalized.length, "Import completed successfully"],
  );

  await client.query("commit");
  console.log(`Imported ${normalized.length} dogs from RescueGroups.`);
} catch (error) {
  await client.query("rollback");
  throw error;
} finally {
  client.release();
  await pool.end();
}

function normalizeAnimal(animal, includedMap) {
  const attributes = animal.attributes ?? {};
  const relationships = animal.relationships ?? {};
  const orgRef = firstRelationship(relationships.orgs);
  const pictureRef = firstRelationship(relationships.pictures);
  const org = orgRef ? includedMap.get(`${orgRef.type}:${orgRef.id}`) : null;
  const picture = pictureRef ? includedMap.get(`${pictureRef.type}:${pictureRef.id}`) : null;
  const orgAttributes = org?.attributes ?? {};
  const pictureAttributes = picture?.attributes ?? {};

  const image =
    pictureAttributes.large?.url ??
    pictureAttributes.large?.secureUrl ??
    pictureAttributes.originalUrl ??
    pictureAttributes.url ??
    "/amber-doodle.jpg";

  const energy = normalizeEnergy(
    attributes.energyLevelString ??
      attributes.activityLevel ??
      attributes.activityLevelString ??
      attributes.activityLevelName,
  );

  const size = normalizeSize(attributes.sizeGroup ?? attributes.sizeUOM ?? attributes.sizeCurrent);
  const ageBand = normalizeAge(attributes.ageGroup ?? attributes.ageString ?? attributes.birthDate);

  return {
    id: `rg-${animal.id}`,
    name: attributes.name ?? `Dog ${animal.id}`,
    ageBand,
    size,
    energy,
    goodWithKids: normalizeBoolean(attributes.isGoodWithKids),
    goodWithDogs: normalizeBoolean(attributes.isGoodWithDogs),
    goodWithCats: normalizeBoolean(attributes.isGoodWithCats),
    apartmentFriendly: size !== "large" && energy !== "high",
    eyeContactStrength: "medium",
    trainingLoad: energy === "high" ? "high" : energy === "moderate" ? "moderate" : "light",
    story: truncate(
      attributes.descriptionText ??
        attributes.descriptionTextHtml?.replace(/<[^>]+>/g, " ") ??
        "Imported from RescueGroups public adoptable pet data.",
      280,
    ),
    caution: buildCaution({ energy, size, goodWithKids: normalizeBoolean(attributes.isGoodWithKids) }),
    bestFit: buildBestFit({ energy, size, apartmentFriendly: size !== "large" && energy !== "high" }),
    lifecyclePlan: buildLifecyclePlan(ageBand),
    shelter: {
      id: org ? `rg-org-${org.id}` : "rg-org-unknown",
      name: orgAttributes.name ?? attributes.orgName ?? "RescueGroups Partner",
      city: orgAttributes.city ?? orgAttributes.locationCity ?? "Unknown",
      state: orgAttributes.state ?? orgAttributes.locationState ?? "NA",
      integrationType: "api",
      url: orgAttributes.url ?? attributes.url ?? "https://rescuegroups.org/services/adoptable-pet-data-api/",
    },
    image,
  };
}

function firstRelationship(relationship) {
  if (!relationship?.data) {
    return null;
  }

  return Array.isArray(relationship.data) ? relationship.data[0] ?? null : relationship.data;
}

function normalizeBoolean(value) {
  return value === true || value === 1 || value === "1" || value === "true" || value === "yes";
}

function normalizeEnergy(value) {
  const text = String(value ?? "").toLowerCase();
  if (text.includes("high") || text.includes("very active")) return "high";
  if (text.includes("low") || text.includes("calm")) return "low";
  return "moderate";
}

function normalizeSize(value) {
  const text = String(value ?? "").toLowerCase();
  if (text.includes("small")) return "small";
  if (text.includes("large") || text.includes("x-large")) return "large";
  return "medium";
}

function normalizeAge(value) {
  const text = String(value ?? "").toLowerCase();
  if (text.includes("senior")) return "senior";
  if (text.includes("puppy") || text.includes("baby")) return "puppy";
  if (text.includes("young")) return "young-adult";
  return "adult";
}

function buildCaution({ energy, size, goodWithKids }) {
  if (energy === "high") {
    return "This dog will do best with routine, training follow-through, and a household that can handle high daily output.";
  }
  if (!goodWithKids) {
    return "This profile needs slower introductions and careful household matching, especially around children.";
  }
  if (size === "large") {
    return "Larger dogs can create more friction around housing, transport, and daily handling if expectations are soft.";
  }
  return "Imported profiles still need household-specific review before a final recommendation is made.";
}

function buildBestFit({ energy, size, apartmentFriendly }) {
  const tags = [];

  if (energy === "high") {
    tags.push("Active households");
    tags.push("Owners comfortable with training");
  } else if (energy === "low") {
    tags.push("Calmer routines");
    tags.push("Lower-chaos households");
  } else {
    tags.push("Moderate everyday routines");
    tags.push("Owners who want a flexible companion");
  }

  tags.push(size === "large" ? "Homes with room to manage a larger dog" : "Households open to easier day-to-day handling");

  if (apartmentFriendly) {
    tags.push("Apartments or tighter living spaces can still work");
  }

  return tags.slice(0, 3);
}

function buildLifecyclePlan(ageBand) {
  if (ageBand === "puppy") {
    return {
      first30Days: [
        "Protect sleep, potty, and decompression routines immediately.",
        "Keep the environment simple while the dog settles in.",
        "Start reward-based handling and crate or confinement comfort early.",
      ],
      first90Days: [
        "Work social exposure in gradually rather than all at once.",
        "Track bite inhibition, overstimulation, and recovery time.",
        "Budget for training support before habits harden.",
      ],
      longerTerm: [
        "Revisit routine as adolescence changes behavior and energy.",
        "Keep training refreshers in place during life transitions.",
        "Plan enrichment and exercise before boredom becomes friction.",
      ],
    };
  }

  if (ageBand === "senior") {
    return {
      first30Days: [
        "Create a low-stress resting space and monitor mobility.",
        "Book a baseline vet review quickly.",
        "Keep surfaces and routines predictable.",
      ],
      first90Days: [
        "Adjust exercise around stamina and comfort.",
        "Track appetite, sleep, and recovery changes.",
        "Set expectations for senior wellness costs early.",
      ],
      longerTerm: [
        "Watch for cognitive or mobility drift.",
        "Refresh care routines as aging changes daily needs.",
        "Plan housing and travel around comfort, not convenience.",
      ],
    };
  }

  return {
    first30Days: [
      "Keep the decompression window calm and predictable.",
      "Start a simple feed, rest, and walk rhythm early.",
      "Limit overstimulation while trust is still forming.",
    ],
    first90Days: [
      "Track early friction around kids, pets, and routine shifts.",
      "Use coaching sooner if behaviors start to escalate.",
      "Grow exercise and social exposure gradually.",
    ],
    longerTerm: [
      "Refresh routines when schedules or housing change.",
      "Reassess care needs as the dog ages.",
      "Keep support visible so relationship drift does not become return risk.",
    ],
  };
}

function truncate(value, maxLength) {
  const clean = String(value ?? "").replace(/\s+/g, " ").trim();
  return clean.length <= maxLength ? clean : `${clean.slice(0, maxLength - 1)}…`;
}

function stripShelter(dog) {
  const { shelter, ...profile } = dog;
  return profile;
}
