import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export const Card = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card"
      className={cn('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className)}
      {...props}
    />
  );
};
