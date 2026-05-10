# Architecture overview

This repository is organized as a clean Next.js App Router starter with a strong separation between UI, validation, server logic, and database access.

## Key layers

- `src/app/` - App Router pages, layouts, and route handlers.
- `src/components/` - Reusable UI and feature components, including shadcn-inspired primitives.
- `src/lib/` - Shared helpers, Supabase clients, database wiring, validation schemas, and utility functions.
- `src/server/` - Business logic for server actions and services, keeping database access out of React components.
- `src/types/` - Type definitions for the database and domain models.
- `db/` - Drizzle schema definitions and SQL migration files.
- `docs/` - Documentation for setup, architecture, and deployment.

## Technical decisions

- Next.js App Router for modern routing, layouts, and server-side rendering.
- TypeScript for typed client and server code.
- Tailwind CSS for responsive utility-first styling.
- Minimal shadcn-inspired component library for consistent UI.
- Supabase Auth for email/password login and session management.
- Drizzle ORM with Postgres for strongly typed database access.
- Zod for form validation and server action input validation.
- Server actions for authenticated create/update/delete workflows.
- Protected dashboard route using server-side auth checks.
