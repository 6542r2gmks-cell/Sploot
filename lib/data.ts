import { QuizResponse, ShelterOrganization, ShelterPet } from "@/lib/types";

export const defaultQuizResponse: QuizResponse = {
  fullName: "",
  email: "",
  scheduleFlexibility: "hybrid",
  activityLevel: "balanced",
  homeType: "house-yard",
  householdType: "couple",
  existingPets: "none",
  dogExperience: "some",
  monthlyBudget: "comfortable",
  trainingComfort: "moderate",
  movingRisk: "unlikely",
  lifeTransitionRisk: "stable",
  supportSystem: "reliable",
  dogSizePreference: "open",
  dogEnergyPreference: "open",
  appearancePriority: "medium",
  expectationStyle: "hopeful-but-realistic",
};

export const brandDirections = [
  {
    name: "Warm Guide",
    tagline: "Clarity before commitment.",
    summary:
      "Soft trust, practical guidance, and high-confidence education for anxious first-time adopters.",
    homepageHook: "Make the decision with your head and your heart still intact.",
  },
  {
    name: "Modern Matchmaker",
    tagline: "Swipe with context.",
    summary:
      "Playful browse mechanics, but every match card earns the right to be liked with clear fit logic.",
    homepageHook: "A more accountable way to find the dog that fits your actual life.",
  },
  {
    name: "Outcome First",
    tagline: "Better fits. Fewer failed adoptions.",
    summary:
      "Shelter credibility, evidence-led positioning, and strong emphasis on return reduction.",
    homepageHook: "Built around long-term placement success, not listing volume.",
  },
  {
    name: "Companion Coach",
    tagline: "Find the dog. Learn the relationship.",
    summary:
      "Adoption is the start of the product, not the end. Lifecycle support stays visible throughout.",
    homepageHook: "From your first quiz answer to your dog’s senior years, stay prepared.",
  },
];

export const researchSignals = [
  {
    title: "Eye Contact Matters",
    detail:
      "Strong dog-eye visibility and emotionally legible portraits increase the sense of bond and help Sploot lead with trust instead of generic listings.",
  },
  {
    title: "Humans Drive Most Returns",
    detail:
      "Behavioral issues, expectation gaps, finances, and household friction are more predictive than aesthetics, so the quiz screens those first.",
  },
  {
    title: "The Post-Adoption Window Is Critical",
    detail:
      "The first 30 to 90 days shape trust, routine, and retention. Sploot transitions directly into support after matching.",
  },
  {
    title: "Mainstream, Not Niche",
    detail:
      "The audience skews younger and social-first, but it is not limited to early adopters. The experience must feel obvious, warm, and low-friction.",
  },
];

const shelters: ShelterOrganization[] = [
  {
    id: "rg-denver",
    name: "Front Range Rescue Collective",
    city: "Denver",
    state: "CO",
    integrationType: "api",
    url: "https://example.org/front-range-rescue",
  },
  {
    id: "sl-austin",
    name: "Hill Country Shelter Partners",
    city: "Austin",
    state: "TX",
    integrationType: "widget",
    url: "https://example.org/hill-country-shelter",
  },
  {
    id: "pf-chicago",
    name: "Lakefront Dog Alliance",
    city: "Chicago",
    state: "IL",
    integrationType: "external-link",
    url: "https://example.org/lakefront-dogs",
  },
];

export const dogs: ShelterPet[] = [
  {
    id: "mabel",
    name: "Mabel",
    ageBand: "young-adult",
    size: "small",
    energy: "moderate",
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: false,
    apartmentFriendly: true,
    eyeContactStrength: "high",
    trainingLoad: "moderate",
    story:
      "Mabel locks in with people quickly, settles into routines, and thrives with owners who want a bright dog without constant chaos.",
    caution:
      "She can get vocal when her schedule becomes unpredictable, so consistency matters.",
    bestFit: [
      "Hybrid schedules",
      "First-time owners willing to learn",
      "Homes that can commit to short daily training sessions",
    ],
    lifecyclePlan: {
      first30Days: [
        "Keep greetings calm and limit overstimulation during her decompression window.",
        "Start a simple walk-feed-rest rhythm so she learns what to expect.",
        "Use reward-based cues for settling and leash resets.",
      ],
      first90Days: [
        "Increase social exposure gradually rather than all at once.",
        "Book one positive-skills class to support confidence and consistency.",
        "Track barking triggers and adjust routine before it becomes a pattern.",
      ],
      longerTerm: [
        "Rotate enrichment toys to keep her mentally occupied.",
        "Refresh recall and settle cues during household changes.",
        "Reassess care needs if work schedules become less predictable.",
      ],
    },
    shelter: shelters[0],
    image: "/amber-doodle.jpg",
  },
  {
    id: "oryx",
    name: "Oryx",
    ageBand: "adult",
    size: "medium",
    energy: "high",
    goodWithKids: false,
    goodWithDogs: true,
    goodWithCats: false,
    apartmentFriendly: false,
    eyeContactStrength: "high",
    trainingLoad: "high",
    story:
      "Oryx is deeply people-focused and athletic. He bonds fast, but he needs owners who mean what they say and can keep structure under pressure.",
    caution:
      "Without exercise and clear boundaries, his arousal climbs quickly and he starts making his own decisions.",
    bestFit: [
      "Experienced or coachable active owners",
      "Homes without cats",
      "People ready for a training plan, not just good intentions",
    ],
    lifecyclePlan: {
      first30Days: [
        "Use decompression walks and no-chaos intros instead of dog parks.",
        "Set household rules on day one and keep them consistent.",
        "Start mat work and impulse-control games immediately.",
      ],
      first90Days: [
        "Work with a trainer if leash frustration or over-arousal shows up.",
        "Build exercise variety instead of relying on one intense outlet.",
        "Track triggers around guests, cars, and other dogs.",
      ],
      longerTerm: [
        "Maintain a job-based routine to avoid boredom drift.",
        "Plan for travel and move-related disruption before it happens.",
        "Increase recovery time as he ages to keep behavior stable.",
      ],
    },
    shelter: shelters[1],
    image: "/blue-merle.jpg",
  },
  {
    id: "juno",
    name: "Juno",
    ageBand: "senior",
    size: "medium",
    energy: "low",
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: true,
    apartmentFriendly: true,
    eyeContactStrength: "medium",
    trainingLoad: "light",
    story:
      "Juno is affectionate, easy to read, and ideal for households that want calm companionship with lower day-to-day friction.",
    caution:
      "She needs steady wellness budgeting and attention to age-related mobility changes.",
    bestFit: [
      "Households with moderate energy",
      "Families wanting a gentle, stable dog",
      "Owners who can plan for senior care",
    ],
    lifecyclePlan: {
      first30Days: [
        "Create one safe resting zone and keep foot traffic manageable.",
        "Book a baseline vet visit and discuss mobility support early.",
        "Use rugs or traction aids if flooring is slippery.",
      ],
      first90Days: [
        "Introduce short enrichment sessions rather than long high-energy outings.",
        "Monitor appetite, sleep, and ease of movement.",
        "Teach children how to approach her calmly and predictably.",
      ],
      longerTerm: [
        "Watch for cognitive drift and build cue-based routines.",
        "Reassess stairs, jumping, and car access before they become stressful.",
        "Plan preventative senior wellness costs instead of reacting late.",
      ],
    },
    shelter: shelters[2],
    image: "/amber-doodle.jpg",
  },
];
