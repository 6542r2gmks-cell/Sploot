import {
  MatchCandidate,
  MatchExplanation,
  PreparationPlan,
  QuizResponse,
  ReadinessAssessment,
  ReadinessStatus,
  ShelterPet,
} from "@/lib/types";

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function pushPlan(plans: PreparationPlan[], title: string, actions: string[]) {
  plans.push({ title, actions });
}

export function assessReadiness(response: QuizResponse): ReadinessAssessment {
  let score = 62;
  const strengths: string[] = [];
  const risks: string[] = [];
  const preparationPlans: PreparationPlan[] = [];

  if (response.scheduleFlexibility === "mostly-home" || response.scheduleFlexibility === "hybrid") {
    score += 7;
    strengths.push("Your schedule leaves room for decompression, routine, and training follow-through.");
  } else {
    score -= 8;
    risks.push("A less predictable schedule increases the risk of behavior friction early on.");
    pushPlan(preparationPlans, "Stabilize your schedule", [
      "Define feeding, walk, and rest windows you can actually sustain.",
      "Line up backup care before bringing a dog home.",
    ]);
  }

  if (response.monthlyBudget === "comfortable" || response.monthlyBudget === "high") {
    score += 6;
    strengths.push("You appear better positioned to absorb routine and surprise dog-care costs.");
  }

  if (response.monthlyBudget === "tight") {
    score -= 12;
    risks.push("Tight budgeting is a known stressor when behavior, medical, or transition costs show up.");
    pushPlan(preparationPlans, "Pressure-test the budget", [
      "Estimate monthly food, grooming, preventive meds, vet visits, and training support.",
      "Build a starter buffer for the first 90 days rather than assuming a smooth transition.",
    ]);
  }

  if (response.lifeTransitionRisk === "major") {
    score -= 12;
    risks.push("A major life transition increases the odds that even a good match becomes hard to maintain.");
    pushPlan(preparationPlans, "Wait out the transition", [
      "Delay adoption until housing, family, or work changes settle.",
      "If you proceed, target lower-maintenance adult dogs and add outside support.",
    ]);
  } else if (response.lifeTransitionRisk === "stable") {
    score += 5;
    strengths.push("A stable season of life usually gives new routines a better chance to hold.");
  }

  if (response.movingRisk === "very-likely") {
    score -= 10;
    risks.push("An upcoming move can destabilize the critical first months after adoption.");
    pushPlan(preparationPlans, "Plan around housing risk", [
      "Confirm breed, weight, and pet restrictions before you commit.",
      "Avoid high-needs dogs if your housing picture may change soon.",
    ]);
  }

  if (response.supportSystem === "reliable" || response.supportSystem === "strong") {
    score += 6;
    strengths.push("You have a support system that can absorb disruptions without turning the dog into a crisis.");
  } else {
    score -= 4;
    risks.push("Limited backup support can make routine disruptions harder to recover from.");
  }

  if (response.expectationStyle === "want-easy" || response.expectationStyle === "idealized") {
    score -= 14;
    risks.push("Your expectations may be too optimistic for the first 30 to 90 days of dog ownership.");
    pushPlan(preparationPlans, "Close the expectation gap", [
      "Assume decompression, accidents, noise, and schedule friction are normal at first.",
      "Read a first-30-days plan before choosing a dog.",
    ]);
  } else {
    score += 5;
    strengths.push("Your answers suggest a realistic view of how trust and routine develop.");
  }

  if (response.appearancePriority === "high") {
    score -= 6;
    risks.push("Leading with looks alone increases the chance of self-projection and mismatch.");
    pushPlan(preparationPlans, "Bias-check your shortlist", [
      "Compare at least one dog outside your preferred look profile.",
      "Prioritize behavior and household fit over aesthetics in the final decision.",
    ]);
  }

  if (response.dogExperience === "first-time") {
    score -= 4;
    risks.push("As a first-time owner, support and fit matter more than charisma or rescue urgency.");
  } else if (response.dogExperience === "behavior-savvy") {
    score += 6;
    strengths.push("Your experience increases the odds you can manage friction before it becomes a return risk.");
  }

  if (response.trainingComfort === "low") {
    score -= 10;
    risks.push("Low training tolerance creates risk if the dog needs structure, not just affection.");
    pushPlan(preparationPlans, "Pre-commit to support", [
      "Budget for at least one professional coaching session if issues show up.",
      "Choose dogs marked light or moderate for training load.",
    ]);
  }

  if (response.existingPets === "dog-and-cat") {
    score -= 5;
    risks.push("Multi-pet households need tighter compatibility screening and slower introductions.");
  } else if (response.existingPets === "none") {
    score += 3;
  }

  const finalScore = clamp(score);

  let status: ReadinessStatus = "ready";
  if (finalScore < 50) {
    status = "not-ready-yet";
  } else if (finalScore < 72) {
    status = "proceed-with-caveats";
  }

  const summaryByStatus: Record<ReadinessStatus, string> = {
    ready:
      "You look ready to move forward with a curated shortlist. Sploot should still keep the fit logic strict rather than rewarding impulse.",
    "proceed-with-caveats":
      "You can proceed, but your answers point to avoidable friction. The right dog and a stronger plan matter more than speed.",
    "not-ready-yet":
      "Sploot should slow this down. Your answers suggest the adoption moment may outpace your current support, stability, or expectations.",
  };

  return {
    score: finalScore,
    status,
    summary: summaryByStatus[status],
    strengths,
    risks,
    preparationPlans,
  };
}

function confidenceFromScore(score: number): MatchExplanation["confidence"] {
  if (score >= 82) return "high";
  if (score >= 65) return "medium";
  return "low";
}

export function buildMatches(
  response: QuizResponse,
  assessment: ReadinessAssessment,
  pets: ShelterPet[],
): MatchCandidate[] {
  const matches = pets.map((pet) => {
    let score = 56;
    const reasons: string[] = [];
    const cautions: string[] = [];
    const notForYou: string[] = [];

    if (response.dogSizePreference === "open" || response.dogSizePreference === pet.size) {
      score += 8;
      reasons.push(`Your size preference leaves room for a ${pet.size} dog like ${pet.name}.`);
    }

    if (response.dogEnergyPreference === "open") {
      score += 4;
    } else if (
      (response.dogEnergyPreference === "low" && pet.energy === "low") ||
      (response.dogEnergyPreference === "moderate" && pet.energy === "moderate") ||
      (response.dogEnergyPreference === "high" && pet.energy === "high")
    ) {
      score += 10;
      reasons.push(`Your energy expectations line up with ${pet.name}'s ${pet.energy} profile.`);
    } else {
      score -= 10;
      cautions.push(`Energy mismatch is a real risk here: you asked for ${response.dogEnergyPreference}, but ${pet.name} reads ${pet.energy}.`);
    }

    if (response.homeType === "apartment" && !pet.apartmentFriendly) {
      score -= 16;
      notForYou.push(`${pet.name} is a poor fit for apartment living without substantial extra structure.`);
    } else if (response.homeType === "apartment" && pet.apartmentFriendly) {
      score += 8;
      reasons.push(`${pet.name} can succeed without a yard if routine and decompression are handled well.`);
    }

    if (response.householdType === "family-young-kids" && !pet.goodWithKids) {
      score -= 18;
      notForYou.push(`${pet.name} should not be prioritized for a household with young children.`);
    } else if (pet.goodWithKids && response.householdType !== "solo") {
      score += 6;
      reasons.push(`${pet.name} has a better family-fit profile than average.`);
    }

    if (
      (response.existingPets === "cat" || response.existingPets === "dog-and-cat") &&
      !pet.goodWithCats
    ) {
      score -= 18;
      notForYou.push(`${pet.name} is not a strong cat-home candidate.`);
    }

    if (
      (response.existingPets === "dog" || response.existingPets === "dog-and-cat") &&
      !pet.goodWithDogs
    ) {
      score -= 16;
      notForYou.push(`${pet.name} needs a more controlled single-dog setup.`);
    }

    if (response.scheduleFlexibility === "office-heavy" || response.scheduleFlexibility === "unpredictable") {
      if (pet.trainingLoad === "high" || pet.energy === "high") {
        score -= 10;
        cautions.push(`${pet.name} may outpace the structure your schedule can currently support.`);
      }
    } else {
      score += 6;
      reasons.push("Your schedule gives this dog a better shot at a stable decompression window.");
    }

    if (response.trainingComfort === "low" && pet.trainingLoad === "high") {
      score -= 14;
      notForYou.push(`${pet.name} needs more training follow-through than you said you want to carry alone.`);
    } else if (response.trainingComfort !== "low") {
      score += 6;
      reasons.push("You appear willing to support structured learning if this match needs it.");
    }

    if (assessment.status === "not-ready-yet") {
      score -= 10;
      cautions.push("Because readiness is low, this match should be treated as exploratory, not immediate.");
    } else if (assessment.status === "proceed-with-caveats") {
      score -= 4;
      cautions.push("Proceed carefully and use the preparation plan before committing.");
    }

    if (pet.eyeContactStrength === "high") {
      reasons.push(`${pet.name}'s profile uses stronger eye-contact-forward imagery to help you read connection without losing fit discipline.`);
    }

    const finalScore = clamp(score);

    return {
      pet,
      explanation: {
        score: finalScore,
        confidence: confidenceFromScore(finalScore),
        reasons,
        cautions,
        notForYou,
      },
    };
  });

  return matches.sort((left, right) => right.explanation.score - left.explanation.score);
}
