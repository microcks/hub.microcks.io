/*
 * Copyright The Microcks Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NavigationMenuViewport } from '@/shared/components/ui/NavigationMenuViewport/NavigationMenuViewport';
import { cn } from '@/shared/lib/utils';
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
