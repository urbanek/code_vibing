import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export function Alert({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('rounded-3xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100', className)} {...props}>
      {children}
    </div>
  );
}
