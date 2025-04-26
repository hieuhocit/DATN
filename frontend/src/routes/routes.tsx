// React router
import { createBrowserRouter } from 'react-router-dom';

// Layouts
import RootLayout, { loader as rootLoader } from '@/layouts/root/index';

// Pages
import Home from '@/pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        lazy: async () => {
          const { default: Component } = await import('@pages/Login');
          return { Component };
        },
      },
      {
        path: '/sign-up',
        lazy: async () => {
          const { default: Component } = await import('@pages/SignUp');
          return { Component };
        },
      },
      {
        path: '/cart',
        lazy: async () => {
          const { default: Component } = await import('@pages/Cart');
          return { Component };
        },
      },
      {
        path: '/course/:courseId',
        lazy: async () => {
          const { default: Component } = await import(
            '@/pages/course-details/CourseDetails'
          );
          return { Component };
        },
      },
      {
        // path: '/learning/:courseSlug/:lessonId',
        path: '/learning',
        lazy: async () => {
          const { default: Component } = await import('@/pages/Learning');
          return { Component };
        },
      },
      {
        path: '/review',
        lazy: async () => {
          const { default: Component } = await import('@pages/Review');
          return { Component };
        },
      },
    ],
  },
]);

export default router;
