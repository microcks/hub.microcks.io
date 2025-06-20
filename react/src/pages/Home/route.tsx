import type { RouteObject } from 'react-router';
import { Home } from './Home';

export const homeRoutes: RouteObject = {
  index: true,
  element: <Home />,
};
