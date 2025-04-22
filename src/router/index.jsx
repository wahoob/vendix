import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  Cart,
  Categories,
  ChangePassword,
  Dashboard,
  Home,
  Invoices,
  Login,
  Orders,
  Product,
  ProfileSettings,
  Shop,
  Signup,
  Order,
  Users,
  Vendors,
  VerifyEmail,
  Wishlist,
  Invoice,
  Reviews,
  NotFound,
  AddProduct,
  MyProducts,
  Products,
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
                element: <Vendors />,
              },
              {
                path: "orders",
                children: [
                  {
                    index: true,
                    element: <Orders />,
                  },
                  {
                    path: ":id",
                    element: <Order />,
                  },
                ],
              },
              {
                path: "invoices",
                children: [
                  {
                    index: true,
                    element: <Invoices />,
                  },
                  {
                    path: ":id",
                    element: <Invoice />,
                  },
                ],
              },
              {
                path: "reviews",
                element: <Reviews />,
              },
              {
                path: "categories",
                element: <Categories />,
              },
              {
                path: "products",
                children: [
                  {
                    index: true,
                    element: <Products />,
                  },
                  {
                    path: "new",
                    element: <AddProduct />,
                  },
                  {
                    path: "my-products",
                    element: <MyProducts />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
