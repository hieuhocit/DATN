// React router
import { createBrowserRouter } from 'react-router-dom';

// Layouts
import RootLayout from '@/layouts/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <>Home</>,
      },
      // {
      //   path: '/login',
      //   lazy: async () => {
      //     const { default: Component } = await import('@pages/Login');
      //     return { Component };
      //   },
      // },
      // {
      //   path: '/sign-up',
      //   lazy: async () => {
      //     const { default: Component } = await import('@pages/SignUp');
      //     return { Component };
      //   },
      // },
      // {
      //   path: '/cart',
      //   lazy: async () => {
      //     const { default: Component } = await import('@pages/Cart');
      //     return { Component };
      //   },
      // },
    ],
  },
]);

export default router;
