import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export const CardAction = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
};
