// React router
import { createBrowserRouter } from "react-router-dom";

// Layouts
import RootLayout, { loader as rootLoader } from "@/layouts/root/index";

// Pages
import Home, { loader as homeLoader } from "@/pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Home />,
        // loader: homeLoader,
      },
      {
        path: "/login",
        lazy: async () => {
          const { default: Component } = await import("@pages/Login");
          return { Component };
        },
      },
      {
        path: "/sign-up",
        lazy: async () => {
          const { default: Component } = await import("@pages/SignUp");
          return { Component };
        },
      },
      {
        path: "/cart",
        lazy: async () => {
          const { default: Component } = await import("@pages/Cart");
          return { Component };
        },
      },
      {
        path: "/courses/:courseId",
        lazy: async () => {
          const { default: Component, loader } = await import(
            "@/pages/course-details"
          );
          return { Component, loader };
        },
      },
      {
        path: "/learning/:courseSlug",
        lazy: async () => {
          const { default: Component } = await import("@/pages/Learning");
          return { Component };
        },
      },
    ],
  },
]);

export default router;
