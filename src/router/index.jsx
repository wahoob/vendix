import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  Cart,
  ChangePassword,
  Dashboard,
  Deactivate,
  Home,
  Login,
  Product,
  ProfileSettings,
  Shop,
  Signup,
  Users,
  Vendors,
  VerifyEmail,
  Wishlist,
} from "../pages";

import {
  AuthWrapper,
  PageContainer,
  LoginPersist,
  ProtectedLayout,
  DashboardContainer,
} from "../layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPersist />,
    children: [
      {
        path: "/",
        element: <PageContainer />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "shop",
            element: <Shop />,
          },
          {
            path: "shop/:slug",
            element: <Product />,
          },
          {
            path: "/",
            element: <ProtectedLayout allowedRoles={["user", "vendor"]} />,
            children: [
              {
                path: "cart",
                element: <Cart />,
              },
              {
                path: "wishlist",
                element: <Wishlist />,
              },
            ],
          },
        ],
      },
      {
        path: "auth",
        element: <ProtectedLayout preventAccessWhenLoggedIn />,
        children: [
          {
            element: <AuthWrapper />,
            children: [
              {
                path: "login",
                element: <Login />,
              },
              {
                path: "signup",
                element: <Signup />,
              },
            ],
          },
          {
            path: "verify/:code",
            element: <VerifyEmail />,
          },
        ],
      },
      {
        path: "dashboard",
        element: <ProtectedLayout />,
        children: [
          {
            element: <DashboardContainer />,
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              {
                path: "profile-settings",
                children: [
                  {
                    index: true,
                    element: <ProfileSettings />,
                  },
                  {
                    path: "password",
                    element: <ChangePassword />,
                  },
                  {
                    path: "deactivate",
                    element: <Deactivate />,
                  },
                ],
              },
              {
                path: "users",
                element: <ProtectedLayout allowedRoles={["admin"]} />,
                children: [
                  {
                    index: true,
                    element: <Users />,
                  },
                ],
              },
              {
                path: "vendors",
                element: <Vendors/>
              }
            ],
          },
        ],
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
