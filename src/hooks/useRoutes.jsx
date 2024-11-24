import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useRoutes = () => {
  const { pathname } = useLocation();

  const routes = useMemo(
    () => [
      {
        path: "/",
        label: "Home",
        icon: "pi pi-home",
        active: pathname === "/",
      },
      {
        path: "/shop",
        label: "Shop",
        active: pathname === "/shop",
      },
    ],
    [pathname]
  );

  return routes;
};

export default useRoutes;
