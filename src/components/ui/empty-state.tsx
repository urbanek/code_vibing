import type { ReactNode } from 'react';

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-8 text-slate-300 shadow-soft">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Empty state</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-100">{title}</h2>
      <p className="mt-3 leading-7 text-slate-400">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
