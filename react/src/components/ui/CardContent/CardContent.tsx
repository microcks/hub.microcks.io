import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export const CardContent = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div data-slot="card-content" className={cn('px-6', className)} {...props} />;
};
