import type { RouteObject } from 'react-router';
import { APIVersion } from './APIVersion';

export const apiVersionRoutes: RouteObject = {
  path: '/package/:packageId/api/:apiVersionId',
  element: <APIVersion />,
};
