# Sploot

Research-informed web proof of concept for dog-owner readiness screening, curated matching, lifecycle support, and early shelter-data import scaffolding.

## Run Locally

```bash
cmd /c npm install
cmd /c npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Route Map

- `/` public landing page
- `/demo` concept gallery
- `/demo/warm-guide`
- `/demo/modern-matchmaker`
- `/demo/outcome-first`
- `/demo/companion-coach`
- `/demo/trial` interactive Sploot app

## Brand Rules

- Master brand line: `Match. Care. Thrive.`
- Supporting lifecycle line: `Find the dog. Learn the relationship.`
- `/` stays public and beta-download-first
- `/demo` stays internal review oriented

## GitHub And Vercel Handoff

1. Commit the app, docs, public assets, schema, and config files.
2. Do not commit `.next/`, `node_modules/`, or local env files.
3. Push the repo to GitHub.
4. Connect the repo to Vercel Hobby.
5. Verify these public URLs after deployment:
   - `/`
   - `/demo`
   - `/demo/warm-guide`
   - `/demo/modern-matchmaker`
   - `/demo/outcome-first`
   - `/demo/companion-coach`
   - `/demo/trial`

Slack-ready share pattern after Vercel deploy:

- Public/product: `https://<your-vercel-domain>/`
- Concept review: `https://<your-vercel-domain>/demo`
- Live prototype: `https://<your-vercel-domain>/demo/trial`

## Environment Variables

Copy [.env.example](/C:/Users/Citgo/Documents/GitHub/Sploot/.env.example) into `.env.local` or `.env` when you are ready for live shelter imports.

```bash
DATABASE_URL=
RESCUEGROUPS_API_KEY=
RESCUEGROUPS_API_BASE=https://api.rescuegroups.org/v5
RESCUEGROUPS_IMPORT_LIMIT=12
```

- `DATABASE_URL`
  Use your Supabase Postgres connection string or another Postgres database.
- `RESCUEGROUPS_API_KEY`
  Request a public key from RescueGroups before running imports.
- `RESCUEGROUPS_API_BASE`
  Defaults to the RescueGroups v5 public API.
- `RESCUEGROUPS_IMPORT_LIMIT`
  Controls how many dogs to import in one run.

## Shelter Import Workflow

The app can now fall back to local demo dogs when no database is configured, or read imported shelter dogs when `DATABASE_URL` is present.

First-time setup:

1. Create a free Supabase project.
2. Apply [database/schema.sql](/C:/Users/Citgo/Documents/GitHub/Sploot/database/schema.sql).
3. Add the environment variables above.
4. Install dependencies and run a dry import first:

```bash
cmd /c npm run import:rescuegroups -- --dry-run
```

5. Run the real import:

```bash
cmd /c npm run import:rescuegroups
```

6. Start the app and open `/demo/trial` to confirm imported dogs appear instead of only mock data.

## Included

- Next.js + TypeScript app in [app](/C:/Users/Citgo/Documents/GitHub/Sploot/app)
- Interactive quiz, matching, and lifecycle flow in [components/home-page.tsx](/C:/Users/Citgo/Documents/GitHub/Sploot/components/home-page.tsx)
- Brand concept system in [components/brand-preview-page.tsx](/C:/Users/Citgo/Documents/GitHub/Sploot/components/brand-preview-page.tsx) and [lib/brand-previews.ts](/C:/Users/Citgo/Documents/GitHub/Sploot/lib/brand-previews.ts)
- Live shelter data fallback wiring in [lib/server/shelter-pets.ts](/C:/Users/Citgo/Documents/GitHub/Sploot/lib/server/shelter-pets.ts)
- Import scaffold in [scripts/import-rescuegroups.mjs](/C:/Users/Citgo/Documents/GitHub/Sploot/scripts/import-rescuegroups.mjs)
- Internal agent operating docs in [docs/agents](/C:/Users/Citgo/Documents/GitHub/Sploot/docs/agents)
- Database starter schema in [database/schema.sql](/C:/Users/Citgo/Documents/GitHub/Sploot/database/schema.sql)
