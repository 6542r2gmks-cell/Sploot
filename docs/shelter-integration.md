# Shelter Integration Strategy

## Primary
Normalize API-accessible adoptable dog data into Sploot tables so matching, lifecycle recommendations, and analytics run on a stable internal schema.

## Secondary
For partners without a usable API, support:
- Embedded shelter widgets
- Outbound shelter profile links
- Manual profile imports for pilot shelters

## Partner Roadmap
- Photo-quality coaching with eye-contact-forward card selection
- Profile-copy improvements that close expectation gaps
- Return-risk reporting by household and dog-profile segment

## Immediate Technical Shape
- Source adapters per provider
- `pet_import_runs` audit table
- Stable internal pet schema
- Partner metadata that records `api`, `widget`, or `external-link`
