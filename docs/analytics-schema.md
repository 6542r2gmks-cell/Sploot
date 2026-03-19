# Sploot Analytics Schema

## Core Events
- `homepage_cta_click`
- `quiz_started`
- `quiz_step_advanced`
- `quiz_completed`
- `readiness_scored`
- `preparation_plan_viewed`
- `match_viewed`
- `match_liked`
- `match_passed`
- `outbound_shelter_click`
- `waitlist_submitted`
- `lifecycle_panel_viewed`

## Required Properties
- `session_id`
- `user_type`
- `readiness_status`
- `readiness_score`
- `pet_id`
- `shelter_id`
- `integration_type`
- `focus`

## First Dashboards
1. Quiz funnel: start -> completion -> readiness buckets.
2. Match quality: view -> like/pass ratio by readiness segment.
3. Conversion: outbound shelter clicks and waitlist rate.
4. Risk calibration: high-caution users who still prefer high-friction dogs.
