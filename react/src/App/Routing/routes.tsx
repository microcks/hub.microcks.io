import { Layout } from '@/App/Layout/Layout.tsx';
import APIVersion from '@/pages/APIVersion.tsx';
import Doc from '@/pages/Doc.tsx';
import Home from '@/pages/Home.tsx';
import Package from '@/pages/Package.tsx';
import { Outlet, type RouteObject } from 'react-router';

const rootRoutes: RouteObject = {
  path: '/',
  element: (
    <Layout>
      <Outlet />
    </Layout>
  ),
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: '/package/:packageId',
      element: <Package />,
    },
    {
      path: '/package/:packageId/api/:apiVersionId',
      element: <APIVersion />,
    },
    {
      path: '/doc/:page',
      element: <Doc />,
    }
  ],
};

export const routesObject: RouteObject[] = [rootRoutes];