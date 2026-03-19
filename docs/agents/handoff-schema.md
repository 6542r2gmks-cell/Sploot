# Shared Handoff Schema

## Fields
- `objective`: what this workstream is trying to achieve
- `decision`: what changed or was chosen
- `evidence`: research, metrics, or partner input that justify the decision
- `next_owner`: which agent or human owns the next move
- `blockers`: anything unresolved that could change execution

## Example
```json
{
  "objective": "Tighten readiness gating",
  "decision": "Budget and moving risk now trigger stronger caution states",
  "evidence": ["return-risk research", "pilot quiz review"],
  "next_owner": "Quiz Pairing Optimization Agent",
  "blockers": []
}
```
