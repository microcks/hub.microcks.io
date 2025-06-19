import { cn } from '@/lib/utils';
import { Indicator } from '@radix-ui/react-navigation-menu';
import type { ComponentProps } from 'react';

export const NavigationMenuIndicator = ({ className, ...props }: ComponentProps<typeof Indicator>) => {
  return (
    <Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
        className,
      )}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </Indicator>
  );
};
