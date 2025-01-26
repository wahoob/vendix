import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Cart,
  Home,
  Login,
  Product,
  Shop,
  Signup,
  VerifyEmail,
} from "../pages";
import {
  AuthWrapper,
  PageContainer,
  LoginPersist,
  ProtectedLayout,
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
            path: "cart",
            element: <ProtectedLayout allowedRoles={["user"]} />,
            children: [
              {
                path: "/cart",
                element: <Cart />,
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
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
