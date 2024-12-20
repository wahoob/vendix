import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useRoutes = () => {
  const { pathname } = useLocation();

  const routes = useMemo(() => {
    const isShowWithSlug = pathname.startsWith("/shop/");

    return [
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
      isShowWithSlug && {
        path: pathname,
        label: pathname.split("/").pop().replace(/-/g, " "),
        active: true,
      },
    ];
  }, [pathname]);

  return routes;
};

export default useRoutes;
