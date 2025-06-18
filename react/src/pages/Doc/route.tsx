import type { RouteObject } from 'react-router';
import { Doc } from './Doc';

export const docRoutes: RouteObject = {
  path: '/doc/:page',
  element: <Doc />,
};