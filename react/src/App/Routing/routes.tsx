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

import { Layout } from '@/App/Layout/Layout';
import { apiVersionRoutes } from '@/pages/APIVersion/route';
import { docRoutes } from '@/pages/Doc/route';
import { homeRoutes } from '@/pages/Home/route';
import { packageRoutes } from '@/pages/Package/route';
import { Outlet, type RouteObject } from 'react-router';

const rootRoutes: RouteObject = {
  path: '/',
  element: (
    <Layout>
      <Outlet />
    </Layout>
  ),
  children: [homeRoutes, packageRoutes, apiVersionRoutes, docRoutes],
};

export const routesObject: RouteObject[] = [rootRoutes];
