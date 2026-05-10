import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary';
};

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70',
        variant === 'secondary'
          ? 'border border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-500 hover:bg-slate-800'
          : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400',
        className,
      )}
      {...props}
    />
  );
}
