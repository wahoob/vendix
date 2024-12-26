import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, Product, Shop, Signup, VerifyEmail } from "../pages";
import { AuthWrapper, PageContainer, LoginPersist } from "../layouts";

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
        ],
      },
      {
        path: "auth",
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
