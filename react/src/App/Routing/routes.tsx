import { Layout } from '@/App/Layout/Layout.tsx';
import { apiVersionRoutes } from '@/pages/APIVersion/route.tsx';
import { docRoutes } from '@/pages/Doc/route.tsx';
import { homeRoutes } from '@/pages/Home/route.tsx';
import { packageRoutes } from '@/pages/Package/route.tsx';
import { Outlet, type RouteObject } from 'react-router';

const rootRoutes: RouteObject = {
  path: '/',
  element: (
    <Layout>
      <Outlet />
    </Layout>
  ),
  children: [
    homeRoutes,
    packageRoutes,
    apiVersionRoutes,
    docRoutes,
  ],
};

export const routesObject: RouteObject[] = [rootRoutes];