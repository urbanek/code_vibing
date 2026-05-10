# Local setup

## Install dependencies

```bash
npm install
```

## Configure environment variables

Copy the example file and update it with your Supabase and database values.

```bash
cp .env.example .env.local
```

Then update `.env.local` with:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL`
- `NEXT_PUBLIC_APP_URL`

If you use service role operations later, add `SUPABASE_SERVICE_ROLE_KEY`.

## Run the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Apply Drizzle migrations

Create or apply migrations with:

```bash
npm run drizzle:migrate
```

If you need to push the current schema to the database in one step:

```bash
npm run drizzle:push
```

## Supabase Row Level Security (RLS)

After the `projects` table exists, enable RLS and apply a policy that only allows users to manage their own records.

```sql
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own projects"
ON public.projects
FOR ALL
TO public
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

## Recommended future tests

- Add Playwright end-to-end tests for login, dashboard protection, and project CRUD.
- Add Vitest unit tests for server services and validation schemas.
