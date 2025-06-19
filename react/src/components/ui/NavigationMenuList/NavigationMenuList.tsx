import { cn } from '@/lib/utils';
import { List } from 'lucide-react';
import type { ComponentProps } from 'react';

export const NavigationMenuList = ({ className, ...props }: ComponentProps<typeof List>) => {
  return (
    <List
      data-slot="navigation-menu-list"
      className={cn('group flex flex-1 list-none items-center justify-center gap-1', className)}
      {...props}
    />
  );
};
