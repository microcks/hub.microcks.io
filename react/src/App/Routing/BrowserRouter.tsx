import { createBrowserRouter, RouterProvider } from 'react-router';
import { routesObject } from './routes';

export const BrowserRouter = () => {
  const router = createBrowserRouter(routesObject);

  return <RouterProvider router={router} />;
};
