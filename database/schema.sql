create table if not exists quiz_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text,
  payload jsonb not null
);

create table if not exists readiness_assessments (
  id uuid primary key default gen_random_uuid(),
  quiz_submission_id uuid references quiz_submissions(id) on delete cascade,
  created_at timestamptz not null default now(),
  status text not null,
  score integer not null,
  summary text not null,
  strengths jsonb not null,
  risks jsonb not null,
  preparation_plans jsonb not null
);

create table if not exists shelter_organizations (
  id text primary key,
  created_at timestamptz not null default now(),
  name text not null,
  city text not null,
  state text not null,
  integration_type text not null,
  url text not null
);

create table if not exists shelter_pets (
  id text primary key,
  shelter_id text not null references shelter_organizations(id) on delete cascade,
  created_at timestamptz not null default now(),
  name text not null,
  profile jsonb not null
);

create table if not exists pet_import_runs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source_name text not null,
  status text not null,
  pets_imported integer not null default 0,
  notes text
);

create table if not exists match_results (
  id uuid primary key default gen_random_uuid(),
  readiness_assessment_id uuid references readiness_assessments(id) on delete cascade,
  pet_id text references shelter_pets(id) on delete cascade,
  created_at timestamptz not null default now(),
  score integer not null,
  confidence text not null,
  reasons jsonb not null,
  cautions jsonb not null,
  not_for_you jsonb not null,
  reaction text
);

create table if not exists waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique,
  name text,
  focus text not null default 'general'
);

create table if not exists lifecycle_recommendations (
  id uuid primary key default gen_random_uuid(),
  pet_id text references shelter_pets(id) on delete cascade,
  created_at timestamptz not null default now(),
  first_30_days jsonb not null,
  first_90_days jsonb not null,
  longer_term jsonb not null
);
