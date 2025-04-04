import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import Home from '@pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
    ],
  },
<<<<<<< HEAD
=======
  {
    path: '/login',
    lazy: async () => {
      const { default: Component } = await import('@pages/Login');
      return { Component };
    },
  },
  {
    path: '/signup', // Thêm route mới cho SignUp
    lazy: async () => {
      const { default: Component } = await import('@pages/SignUp');
      return { Component };
    },
  },
>>>>>>> 39da05f7266fb674b09f1c1b2a7c8a76d4ad4ca5
]);

export default router;