import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  Cart,
  Dashboard,
  Home,
  Login,
  Product,
  Shop,
  Signup,
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
            path: "/",
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
        path: "/",
        // element: <ProtectedLayout />,
        children: [
          {
            path: "/",
            element: <DashboardContainer />,
            children: [
              {
                path: "dashboard",
                element: <Dashboard />,
              },
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
