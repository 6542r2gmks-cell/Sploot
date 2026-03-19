# Shared Handoff Schema

## Fields
- `status`: current execution state
- `priority`: urgency relative to other workstreams
- `due_date`: target date if the work is time-bound
- `objective`: what this workstream is trying to achieve
- `decision`: what changed or was chosen
- `evidence`: research, metrics, or partner input that justify the decision
- `assumptions`: inferred decisions that should be revisited if conditions change
- `artifact_links`: related routes, files, dashboards, or designs
- `next_owner`: which agent or human owns the next move
- `blockers`: anything unresolved that could change execution

## Example
```json
{
  "status": "in-progress",
  "priority": "high",
  "due_date": "2026-03-26",
  "objective": "Tighten readiness gating",
  "decision": "Budget and moving risk now trigger stronger caution states",
  "evidence": ["return-risk research", "pilot quiz review"],
  "assumptions": ["Soft-gating remains the policy"],
  "artifact_links": ["/demo/trial", "/docs/analytics-schema.md"],
  "next_owner": "Quiz Pairing Optimization Agent",
  "blockers": []
}
```
