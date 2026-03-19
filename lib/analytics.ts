export const analyticsEvents = [
  "homepage_cta_click",
  "quiz_started",
  "quiz_step_advanced",
  "quiz_completed",
  "readiness_scored",
  "preparation_plan_viewed",
  "match_viewed",
  "match_liked",
  "match_passed",
  "outbound_shelter_click",
  "waitlist_submitted",
  "lifecycle_panel_viewed",
] as const;

export type AnalyticsEvent = (typeof analyticsEvents)[number];

export function trackEvent(event: AnalyticsEvent, properties: Record<string, unknown> = {}) {
  if (typeof window !== "undefined") {
    const existing = window.localStorage.getItem("sploot-analytics");
    const parsed = existing ? (JSON.parse(existing) as unknown[]) : [];
    parsed.push({ event, properties, timestamp: new Date().toISOString() });
    window.localStorage.setItem("sploot-analytics", JSON.stringify(parsed));
  }
}
