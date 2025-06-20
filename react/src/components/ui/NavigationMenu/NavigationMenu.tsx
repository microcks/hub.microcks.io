import { NavigationMenuViewport } from '@/components/ui/NavigationMenuViewport/NavigationMenuViewport';
import { cn } from '@/lib/utils';
import { Root } from '@radix-ui/react-navigation-menu';
import type { ComponentProps } from 'react';

export const NavigationMenu = ({
  className,
  children,
  viewport = true,
  ...props
}: ComponentProps<typeof Root> & {
  viewport?: boolean;
}) => {
  return (
    <Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn('group/navigation-menu relative flex max-w-max flex-1 items-center justify-center', className)}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </Root>
  );
};
