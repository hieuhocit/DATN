// React router
import { createBrowserRouter, Outlet } from "react-router-dom";

// Layouts
import RootLayout, { loader as rootLoader } from "@/layouts/root/index";

// Pages
import Home from "@/pages/home";
import ErrorPage from "@/pages/ErrorPage";
import DashboardLayout from "@/pages/dashboard/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import ProtectedInstructorRoute from "@/components/ProtectedInstructorRoute";
import ProtectedLearningRoute from "@/components/ProtectedLearningRoute";
import { NotificationProvider } from "@/contexts/NotificationContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: rootLoader,
    errorElement: (
      <RootLayout>
        <ErrorPage />
      </RootLayout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
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
            element: (
              <ProtectedLearningRoute>
                <Outlet />
              </ProtectedLearningRoute>
            ),
            children: [
              {
                path: "/learning/:courseSlug",
                lazy: async () => {
                  const { default: Component } = await import(
                    "@/pages/Learning"
                  );
                  return { Component };
                },
              },
            ],
          },

          {
            path: "/profile",
            lazy: async () => {
              const { default: Component } = await import("@pages/Profile");
              return { Component };
            },
          },
          {
            path: "/change-password",
            lazy: async () => {
              const { default: Component } = await import(
                "@pages/profile/ChangePassword"
              );
              return { Component };
            },
          },
          {
            path: "/my-learning",
            lazy: async () => {
              const { default: Component } = await import(
                "@/pages/my-learning/MyLearning"
              );
              return { Component };
            },
          },
        ],
      },
      {
        element: (
          <ProtectedRoute>
            <ProtectedInstructorRoute>
              <Outlet />
            </ProtectedInstructorRoute>
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/instructor",
            lazy: async () => {
              const { default: Component } = await import(
                "@/pages/instructor/Instructor"
              );
              return { Component };
            },
          },
        ],
      },
      {
        path: "/forgot-password",
        lazy: async () => {
          const { default: ForgotPasswordPage } = await import(
            "@pages/ForgotPassword"
          );
          return { Component: ForgotPasswordPage };
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
        path: "/search",
        lazy: async () => {
          const { default: Component } = await import(
            "@/pages/SearchResultPage"
          );
          return { Component };
        },
      },
      {
        path: "/categories",
        children: [
          {
            path: ":categorySlug1",
            lazy: async () => {
              const { default: Component } = await import("@/pages/Category");
              return { Component };
            },
            children: [
              {
                path: ":categorySlug2",
                lazy: async () => {
                  const { default: Component } = await import(
                    "@/pages/Category"
                  );
                  return { Component };
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <NotificationProvider>
        <ProtectedRoute>
          <ProtectedAdminRoute>
            <DashboardLayout />
          </ProtectedAdminRoute>
        </ProtectedRoute>
      </NotificationProvider>
    ),
    loader: rootLoader,
    errorElement: (
      <RootLayout>
        <ErrorPage />
      </RootLayout>
    ),
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: Component } = await import(
            "@pages/dashboard/statistical/Statistical"
          );
          return { Component };
        },
      },
      {
        path: "user-management",
        lazy: async () => {
          const { default: Component } = await import(
            "@pages/dashboard/user/User"
          );
          return { Component };
        },
      },
      {
        path: "course-management",
        lazy: async () => {
          const { default: Component } = await import(
            "@pages/dashboard/course/Course"
          );
          return { Component };
        },
      },
      {
        path: "payment-management",
        lazy: async () => {
          const { default: Component } = await import(
            "@pages/dashboard/payment/Payment"
          );
          return { Component };
        },
      },
    ],
  },
  {
    path: "*",
    element: (
      <RootLayout>
        <ErrorPage />
      </RootLayout>
    ),
  },
]);

export default router;
