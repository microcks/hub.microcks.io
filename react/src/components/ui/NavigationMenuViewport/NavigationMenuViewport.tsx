import { cn } from '@/lib/utils';
import { Viewport } from '@radix-ui/react-navigation-menu';
import type { ComponentProps } from 'react';

export const NavigationMenuViewport = ({ className, ...props }: ComponentProps<typeof Viewport>) => {
  return (
    <div className={cn('absolute top-full left-0 isolate z-50 flex justify-center')}>
      <Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          'origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]',
          className,
        )}
        {...props}
      />
    </div>
  );
};
