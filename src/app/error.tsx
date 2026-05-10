'use client';

import { useEffect } from 'react';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-red-500/30 bg-slate-900/80 p-10 shadow-soft">
        <h1 className="text-3xl font-semibold text-red-300">Something went wrong</h1>
        <p className="mt-4 text-slate-300">An unexpected error occurred while rendering this page.</p>
        <pre className="mt-6 whitespace-pre-wrap rounded-xl bg-slate-950/70 p-4 text-sm text-slate-200">{error.message}</pre>
        <button
          className="mt-6 inline-flex rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          onClick={() => reset()}
        >
          Reload page
        </button>
      </div>
    </main>
  );
}
