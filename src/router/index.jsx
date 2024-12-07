import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Product, Shop } from "../pages";
import { PageContainer } from "../layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageContainer />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/:slug",
        element: <Product />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
