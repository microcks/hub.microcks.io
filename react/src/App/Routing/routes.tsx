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
