import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export const CardDescription = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div data-slot="card-description" className={cn('text-muted-foreground text-sm', className)} {...props} />;
};
