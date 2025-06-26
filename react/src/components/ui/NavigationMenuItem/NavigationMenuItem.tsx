import { cn } from '@/lib/utils';
import { Item } from '@radix-ui/react-navigation-menu';
import type { ComponentProps } from 'react';

export const NavigationMenuItem = ({ className, ...props }: ComponentProps<typeof Item>) => {
  return <Item data-slot="navigation-menu-item" className={cn('relative', className)} {...props} />;
};
