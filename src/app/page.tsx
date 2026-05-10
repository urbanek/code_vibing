import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-8 pb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Product foundation</p>
            <h1 className="text-4xl font-semibold sm:text-5xl">Build SaaS workflows with a polished dashboard starter.</h1>
            <p className="text-slate-300 sm:text-lg">
              A modern Next.js app with Supabase authentication, Drizzle ORM, Zod validation, and a responsive project manager workflow.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="inline-flex rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                Start free
              </Link>
              <Link href="/login" className="inline-flex rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800">
                Login
              </Link>
            </div>
          </div>
          <Card className="rounded-[2rem] border-slate-800 bg-slate-900/80 p-8 shadow-soft">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Project Manager</p>
            <p className="mt-4 text-2xl font-semibold">Create, update, and delete projects&nbsp;securely.</p>
            <ul className="mt-6 space-y-3 text-slate-300">
              <li>• User-specific project ownership</li>
              <li>• Server actions for safe mutations</li>
              <li>• Production-ready error and loading states</li>
            </ul>
          </Card>
        </header>
        <section className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <h2 className="text-xl font-semibold">Clean auth flow</h2>
            <p className="mt-3 text-slate-300">Email/password sign-up, login, protected dashboard, and sign-out.</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold">Server-backed data</h2>
            <p className="mt-3 text-slate-300">Drizzle ORM manages Postgres and keeps database access outside React UI.</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold">Extendable UI</h2>
            <p className="mt-3 text-slate-300">A minimal responsive interface built with Tailwind and shadcn-inspired components.</p>
          </Card>
        </section>
      </div>
    </main>
  );
}
