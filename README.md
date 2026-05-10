# Code Vibing

A production-ready Next.js App Router starter with Supabase authentication, Drizzle ORM, Tailwind styling, and server actions.

## Features

- Next.js App Router with TypeScript
- Tailwind CSS and shadcn-inspired UI primitives
- Supabase Auth email/password flow
- Drizzle ORM with Postgres schema and typed queries
- Zod validation for form inputs and server actions
- Protected dashboard and project CRUD operations
- Environment-first configuration for Vercel deployment

## Project structure

- `src/app/` — app pages, routes, and error/loading boundaries
- `src/components/` — UI and feature components
- `src/lib/` — Supabase clients, database wiring, validators, and utilities
- `src/server/` — server-side services and actions
- `db/` — Drizzle schema and SQL migrations
- `docs/` — setup, deployment, and architecture documentation

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Supabase setup

1. Create a Supabase project.
2. Add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` values to `.env.local`.
3. Configure the `projects` table using `db/migrations/0001_create_projects_table.sql` or Supabase SQL editor.
4. Enable Row Level Security for `projects` and add the policies described in `docs/setup.md`.

## Running migrations

```bash
npm run drizzle:migrate
```

## Deploying to Vercel

Follow `docs/deployment.md` to connect the repository and set required environment variables.
