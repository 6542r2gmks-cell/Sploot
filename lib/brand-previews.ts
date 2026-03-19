export type BrandMetric = {
  label: string;
  detail: string;
};

export type BrandSection = {
  title: string;
  body: string;
};

export type BrandPreview = {
  slug: string;
  name: string;
  conceptTagline: string;
  heroTitle: string;
  heroBody: string;
  logo: string;
  routeLabel: string;
  cta: string;
  trustLine: string;
  supportLine: string;
  image: string;
  imageAlt: string;
  layoutVariant: "editorial" | "product" | "impact" | "journey";
  themeClass: string;
  metrics: BrandMetric[];
  sections: BrandSection[];
};

export const brandPreviews: BrandPreview[] = [
  {
    slug: "warm-guide",
    name: "Warm Guide",
    conceptTagline: "Clarity before commitment.",
    heroTitle: "A calmer, more prepared path to the right dog.",
    heroBody:
      "This concept positions Sploot as a trusted guide for anxious adopters who want structure, honesty, and support before they bring a dog home.",
    logo: "/logo-beagle-script.jpg",
    routeLabel: "Warm and reassuring",
    cta: "Open the live demo",
    trustLine: "Built for families and first-time adopters who need clarity without judgment.",
    supportLine: "Find the dog. Learn the relationship.",
    image: "/amber-doodle.jpg",
    imageAlt: "Dog portrait with warm eye contact",
    layoutVariant: "editorial",
    themeClass: "warm-guide-theme",
    metrics: [
      {
        label: "Reassure",
        detail: "Reduce anxiety by making readiness, effort, and household fit feel understandable.",
      },
      {
        label: "Prepare",
        detail: "Give owners realistic expectations before emotion turns into an impulse adoption.",
      },
      {
        label: "Support",
        detail: "Keep the first 30 and 90 days visible so the match has structure after adoption.",
      },
    ],
    sections: [
      {
        title: "Gentle hero",
        body: "Lead with calm confidence, eye-contact-forward photography, and practical copy that lowers pressure instead of adding hype.",
      },
      {
        title: "Family-safe framing",
        body: "Explain routine, effort, and decompression in plain language so a mainstream household can move forward without jargon.",
      },
      {
        title: "Support-first close",
        body: "End the page by showing what Sploot will do after the match, not only how it helps you browse.",
      },
    ],
  },
  {
    slug: "modern-matchmaker",
    name: "Modern Matchmaker",
    conceptTagline: "Swipe with context.",
    heroTitle: "A more accountable way to browse dogs you can actually keep.",
    heroBody:
      "This route keeps the playful matching mechanic, but every card still has to earn attention with fit logic, caveats, and lifecycle support.",
    logo: "/logo-match-care-thrive.jpg",
    routeLabel: "Playful but controlled",
    cta: "Open the live demo",
    trustLine: "Best when you want more product energy without making the brand feel careless.",
    supportLine: "Find the dog. Learn the relationship.",
    image: "/blue-merle.jpg",
    imageAlt: "Dog turning back toward the camera",
    layoutVariant: "product",
    themeClass: "modern-matchmaker-theme",
    metrics: [
      {
        label: "Browse",
        detail: "Make the product feel immediate with swipe-adjacent momentum and clearer match cards.",
      },
      {
        label: "Compare",
        detail: "Show fit score, caveats, and household friction before a user falls in love with the wrong dog.",
      },
      {
        label: "Commit",
        detail: "Turn energy into a more serious adoption decision instead of a novelty interaction.",
      },
    ],
    sections: [
      {
        title: "Card-stack hero",
        body: "Use layered cards, chips, and movement cues so the page feels closer to the product interaction model.",
      },
      {
        title: "Guardrails in view",
        body: "Keep one strong trust block under the hero so playful energy never outruns seriousness.",
      },
      {
        title: "Conversion-oriented close",
        body: "Use a sharper CTA rhythm that drives beta downloads first and sends reviewers into the demo second.",
      },
    ],
  },
  {
    slug: "outcome-first",
    name: "Outcome First",
    conceptTagline: "Better fits. Fewer failed adoptions.",
    heroTitle: "Built to improve placement outcomes, not just listing traffic.",
    heroBody:
      "This route pushes the mission and shelter credibility harder. It frames Sploot as a system for reducing mismatches, expectation gaps, and avoidable returns.",
    logo: "/logo-match-care-thrive.jpg",
    routeLabel: "Mission-led and evidence-heavy",
    cta: "Open the live demo",
    trustLine: "Best for shelter, grant, and impact-facing conversations where defensibility matters.",
    supportLine: "Find the dog. Learn the relationship.",
    image: "/blue-merle.jpg",
    imageAlt: "Dog looking toward the viewer with serious expression",
    layoutVariant: "impact",
    themeClass: "outcome-first-theme",
    metrics: [
      {
        label: "Assess",
        detail: "Screen the human side of adoption before a shortlist is allowed to drive the story.",
      },
      {
        label: "Reduce Risk",
        detail: "Make budget strain, move risk, household friction, and expectation gaps explicit product inputs.",
      },
      {
        label: "Improve Outcomes",
        detail: "Position Sploot as a long-term placement tool for adopters and shelter partners.",
      },
    ],
    sections: [
      {
        title: "Mission-led hero",
        body: "Anchor the route in return reduction and placement quality, not in app novelty or mascot charm.",
      },
      {
        title: "Proof architecture",
        body: "Replace soft consumer promises with process clarity, research translation, and post-adoption support blocks.",
      },
      {
        title: "Partner-ready close",
        body: "Show how a shelter or sponsor could trust Sploot as a serious adoption-support system.",
      },
    ],
  },
  {
    slug: "companion-coach",
    name: "Companion Coach",
    conceptTagline: "The relationship is the product.",
    heroTitle: "The match is only the first step. The relationship is the product.",
    heroBody:
      "This route leans into lifecycle assistance and makes the infinity-style logo logic central to the brand system from the start.",
    logo: "/logo-infinity-corgi.jpg",
    routeLabel: "Lifecycle-first",
    cta: "Open the live demo",
    trustLine: "Recommended lead route for the current proof of concept because it matches the long-horizon product story.",
    supportLine: "Find the dog. Learn the relationship.",
    image: "/amber-doodle.jpg",
    imageAlt: "Dog portrait with soft eye contact and warm expression",
    layoutVariant: "journey",
    themeClass: "companion-coach-theme",
    metrics: [
      {
        label: "Match",
        detail: "Use readiness and household fit to surface dogs that can work in real life, not only in theory.",
      },
      {
        label: "Settle In",
        detail: "Turn the first 30 and 90 days into guided milestones instead of a silent handoff.",
      },
      {
        label: "Stay On Track",
        detail: "Keep the owner relationship supported as routines, health, and life stage change over time.",
      },
    ],
    sections: [
      {
        title: "Journey hero",
        body: "Use connected paths and sequence-based modules to make the lifecycle promise feel native to the brand.",
      },
      {
        title: "Milestone support",
        body: "Show first 30 day, first 90 day, and longer-term care stages as part of the product from the start.",
      },
      {
        title: "Coach-like close",
        body: "Make the beta offer feel like ongoing support, not only access to a matching engine.",
      },
    ],
  },
];

export function getBrandPreview(slug: string) {
  return brandPreviews.find((preview) => preview.slug === slug);
}
