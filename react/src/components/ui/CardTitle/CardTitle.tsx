import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export const CardTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  return <div data-slot="card-title" className={cn('leading-none font-semibold', className)} {...props} />;
};
