import "server-only";

import { dogs as fallbackDogs } from "@/lib/data";
import { ShelterOrganization, ShelterPet } from "@/lib/types";
import { hasDatabaseUrl, queryRows } from "@/lib/server/db";

type ShelterPetRow = {
  pet_id: string;
  profile: Omit<ShelterPet, "id" | "shelter"> | null;
  shelter_id: string;
  shelter_name: string;
  shelter_city: string;
  shelter_state: string;
  shelter_integration_type: ShelterOrganization["integrationType"];
  shelter_url: string;
};

function buildShelterOrganization(row: ShelterPetRow): ShelterOrganization {
  return {
    id: row.shelter_id,
    name: row.shelter_name,
    city: row.shelter_city,
    state: row.shelter_state,
    integrationType: row.shelter_integration_type,
    url: row.shelter_url,
  };
}

function normalizePet(row: ShelterPetRow): ShelterPet | null {
  if (!row.profile) {
    return null;
  }

  return {
    ...row.profile,
    id: row.pet_id,
    shelter: buildShelterOrganization(row),
  };
}

export async function getFeaturedDogs(limit = 6): Promise<ShelterPet[]> {
  if (!hasDatabaseUrl()) {
    return fallbackDogs;
  }

  try {
    const rows = await queryRows<ShelterPetRow>(
      `
        select
          p.id as pet_id,
          p.profile,
          s.id as shelter_id,
          s.name as shelter_name,
          s.city as shelter_city,
          s.state as shelter_state,
          s.integration_type as shelter_integration_type,
          s.url as shelter_url
        from shelter_pets p
        join shelter_organizations s on s.id = p.shelter_id
        order by p.created_at desc
        limit $1
      `,
      [limit],
    );

    const liveDogs = rows
      .map(normalizePet)
      .filter((dog): dog is ShelterPet => Boolean(dog));

    return liveDogs.length ? liveDogs : fallbackDogs;
  } catch (error) {
    console.warn("Falling back to local dogs because live shelter fetch failed.", error);
    return fallbackDogs;
  }
}
