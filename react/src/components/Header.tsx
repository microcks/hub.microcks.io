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

import { NavigationMenu } from '@/components/ui/NavigationMenu/NavigationMenu';
import { NavigationMenuContent } from '@/components/ui/NavigationMenuContent/NavigationMenuContent';
import { NavigationMenuItem } from '@/components/ui/NavigationMenuItem/NavigationMenuItem';
import { NavigationMenuLink } from '@/components/ui/NavigationMenuLink/NavigationMenuLink';
import { NavigationMenuList } from '@/components/ui/NavigationMenuList/NavigationMenuList';
import { Link } from 'react-router';
import { NavigationMenuTrigger } from '@/components/ui/NavigationMenuTrigger/NavigationMenuTrigger';

export const Header = () => {
  return (
    <header className="bg-slate-900 shadow-2xl text-white">
      {/* <div className="w-full max-w-3/4 mx-auto px-8 py-14 flex items-center justify-between h-20"> */}
      <div className="max-w-screen-xl mx-auto px-8 py-4 flex items-center justify-between h-20">
        <div className="flex items-center">
          <Link to="/" tabIndex={0}>
            <img
              src="https://hub.microcks.io/assets/images/hub-microcks.svg"
              alt="Microcks Logo"
              className="h-8 mr-2"
            />
            {/* <span className="font-bold text-xl">hub.microcks.io</span> */}
          </Link>
        </div>

        <NavigationMenu>
          <NavigationMenuList className="space-x-4">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white bg-slate-900 hover:bg-slate-800">
                Contribute
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="p-2 space-y-1 bg-white rounded-md text-black min-w-2xs">
                  <li>
                    <Link to="/doc/contribute" className="block px-3 py-2 rounded hover:bg-gray-100">
                      Overview
                    </Link>
                  </li>
                  <li>
                    <Link to="/doc/blog" className="block px-3 py-2 rounded hover:bg-gray-100">
                      Create API mocks and tests suite
                    </Link>
                  </li>
                  <li>
                    <Link to="/doc/faq" className="block px-3 py-2 rounded hover:bg-gray-100">
                      Package your API mocks and tests
                    </Link>
                  </li>
                  <li>
                    <Link to="/doc/faq" className="block px-3 py-2 rounded hover:bg-gray-100">
                      Submit your API package
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {[
              { label: 'About', href: '/about' },
              { label: 'Documentation', href: '/docs' },
              { label: 'Community', href: '/community' },
            ].map(({ label, href }) => (
              <NavigationMenuItem key={label}>
                <NavigationMenuLink
                  to={href}
                  tabIndex={0}
                  className="text-white hover:text-slate-300 px-3 py-2 rounded transition-colors"
                >
                  <span>{label}</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};
