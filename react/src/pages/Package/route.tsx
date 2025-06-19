import type { RouteObject } from 'react-router';
import { Package } from './Package';

export const packageRoutes: RouteObject = {
  path: '/package/:packageId',
  element: <Package />,
};