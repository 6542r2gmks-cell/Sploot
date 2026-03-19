export type ReadinessStatus = "ready" | "proceed-with-caveats" | "not-ready-yet";

export type QuizResponse = {
  fullName: string;
  email: string;
  scheduleFlexibility: "mostly-home" | "hybrid" | "office-heavy" | "unpredictable";
  activityLevel: "calm" | "balanced" | "active" | "very-active";
  homeType: "house-yard" | "house-no-yard" | "apartment" | "shared-home";
  householdType: "solo" | "couple" | "family-young-kids" | "family-teens" | "multi-gen";
  existingPets: "none" | "dog" | "cat" | "dog-and-cat";
  dogExperience: "first-time" | "some" | "experienced" | "behavior-savvy";
  monthlyBudget: "tight" | "steady" | "comfortable" | "high";
  trainingComfort: "low" | "moderate" | "high" | "professional-help-ok";
  movingRisk: "very-likely" | "possible" | "unlikely";
  lifeTransitionRisk: "major" | "moderate" | "stable";
  supportSystem: "solo" | "small" | "reliable" | "strong";
  dogSizePreference: "small" | "medium" | "large" | "open";
  dogEnergyPreference: "low" | "moderate" | "high" | "open";
  appearancePriority: "low" | "medium" | "high";
  expectationStyle: "flexible" | "hopeful-but-realistic" | "want-easy" | "idealized";
};

export type PreparationPlan = {
  title: string;
  actions: string[];
};

export type ReadinessAssessment = {
  score: number;
  status: ReadinessStatus;
  summary: string;
  strengths: string[];
  risks: string[];
  preparationPlans: PreparationPlan[];
};

export type LifecyclePlan = {
  first30Days: string[];
  first90Days: string[];
  longerTerm: string[];
};

export type ShelterOrganization = {
  id: string;
  name: string;
  city: string;
  state: string;
  integrationType: "api" | "widget" | "external-link";
  url: string;
};

export type ShelterPet = {
  id: string;
  name: string;
  ageBand: "puppy" | "young-adult" | "adult" | "senior";
  size: "small" | "medium" | "large";
  energy: "low" | "moderate" | "high";
  goodWithKids: boolean;
  goodWithDogs: boolean;
  goodWithCats: boolean;
  apartmentFriendly: boolean;
  eyeContactStrength: "high" | "medium";
  trainingLoad: "light" | "moderate" | "high";
  story: string;
  caution: string;
  bestFit: string[];
  lifecyclePlan: LifecyclePlan;
  shelter: ShelterOrganization;
  image: string;
};

export type MatchExplanation = {
  score: number;
  confidence: "high" | "medium" | "low";
  reasons: string[];
  cautions: string[];
  notForYou: string[];
};

export type MatchCandidate = {
  pet: ShelterPet;
  explanation: MatchExplanation;
};

export type AgentBrief = {
  mission: string;
  inputs: string[];
  outputs: string[];
  nonGoals: string[];
  cadence: string;
  escalationRules: string[];
};

export type AgentHandoff = {
  objective: string;
  decision: string;
  evidence: string[];
  nextOwner: string;
  blockers: string[];
};
