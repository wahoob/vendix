import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Shop } from "../pages";
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
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
