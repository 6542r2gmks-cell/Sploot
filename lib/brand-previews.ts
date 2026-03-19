export type BrandPreview = {
  slug: string;
  name: string;
  tagline: string;
  heroTitle: string;
  heroBody: string;
  logo: string;
  routeLabel: string;
  cta: string;
  bullets: string[];
  trustLine: string;
};

export const brandPreviews: BrandPreview[] = [
  {
    slug: "warm-guide",
    name: "Warm Guide",
    tagline: "Clarity before commitment.",
    heroTitle: "A calmer, more prepared path to the right dog.",
    heroBody:
      "This concept positions Sploot as a trusted guide for anxious adopters who want structure, honesty, and support before they bring a dog home.",
    logo: "/logo-beagle-script.jpg",
    routeLabel: "Warm and reassuring",
    cta: "View the trial app",
    bullets: [
      "Leads with reassurance and preparation",
      "Best for first-time adopters and family households",
      "Keeps trust higher than novelty",
    ],
    trustLine: "Strong fit for a softer, education-first launch story.",
  },
  {
    slug: "modern-matchmaker",
    name: "Modern Matchmaker",
    tagline: "Swipe with context.",
    heroTitle: "A more accountable way to browse dogs you can actually keep.",
    heroBody:
      "This route keeps the playful matching mechanic, but every card still has to earn attention with fit logic, caveats, and lifecycle support.",
    logo: "/logo-match-care-thrive.jpg",
    routeLabel: "Playful but controlled",
    cta: "View the trial app",
    bullets: [
      "Closest to the product interaction model",
      "Good for conversion and demo energy",
      "Needs careful guardrails to avoid feeling gimmicky",
    ],
    trustLine: "Best for teams that want more product energy without abandoning seriousness.",
  },
  {
    slug: "outcome-first",
    name: "Outcome First",
    tagline: "Better fits. Fewer failed adoptions.",
    heroTitle: "Built to improve placement outcomes, not just listing traffic.",
    heroBody:
      "This route pushes the mission and shelter credibility harder. It frames Sploot as a system for reducing mismatches, expectation gaps, and avoidable returns.",
    logo: "/logo-match-care-thrive.jpg",
    routeLabel: "Mission-led and evidence-heavy",
    cta: "View the trial app",
    bullets: [
      "Strongest shelter and partner story",
      "Good for outcome-focused pitches",
      "Less playful, more defensible",
    ],
    trustLine: "Best for grant, shelter, and impact-facing conversations.",
  },
  {
    slug: "companion-coach",
    name: "Companion Coach",
    tagline: "Find the dog. Learn the relationship.",
    heroTitle: "The match is only the first step. The relationship is the product.",
    heroBody:
      "This route leans into lifecycle assistance and makes the infinity-style logo logic central to the brand system from the start.",
    logo: "/logo-infinity-corgi.jpg",
    routeLabel: "Lifecycle-first",
    cta: "View the trial app",
    bullets: [
      "Best alignment with long-term support positioning",
      "Makes the post-adoption layer feel native",
      "Most consistent with the current chosen logo",
    ],
    trustLine: "Recommended lead route for the current proof of concept.",
  },
];

export function getBrandPreview(slug: string) {
  return brandPreviews.find((preview) => preview.slug === slug);
}
