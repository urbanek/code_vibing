# Vercel deployment

## Prepare the project

Make sure `.env.local` contains the public Supabase values and your `DATABASE_URL` for local development.

## Deploy steps

1. Push the repository to GitHub.
2. Connect the repository to Vercel.
3. In Vercel project settings, add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL`
   - `DATABASE_URL` (optional for server operations outside Supabase)
   - `SUPABASE_SERVICE_ROLE_KEY` (optional, only if you use service-role features)
4. Set the build command to:

```bash
npm run build
```

5. Set the output directory to:

```bash
.next
```

## Notes

- This app is designed for Vercel with App Router and server actions.
- Supabase Auth works with environment-based URL and anon key values.
- If you enable Row Level Security (RLS), use the Supabase dashboard policies described in `docs/setup.md` and `docs/architecture.md`.
