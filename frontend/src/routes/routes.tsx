// react-router
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    lazy: async () => {
      const { default: Component } = await import('@layouts/RootLayout');
      return { Component };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: Component } = await import('@pages/Home');
          return { Component };
        },
      },
    ],
  },
  {
    path: '/login',
    lazy: async () => {
      const { default: Component } = await import('@pages/Login');
      return { Component };
    },
  },
]);

export default router;
