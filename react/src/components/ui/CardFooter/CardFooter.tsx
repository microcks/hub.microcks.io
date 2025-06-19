import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export const CardFooter = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div data-slot="card-footer" className={cn('flex items-center px-6 [.border-t]:pt-6', className)} {...props} />
  );
};
