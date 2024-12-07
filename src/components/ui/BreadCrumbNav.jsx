import { BreadCrumb } from "primereact/breadcrumb";
import { classNames } from "primereact/utils";
import { Link, useLocation } from "react-router-dom";

import { useRoutes } from "../../hooks";

const BreadCrumbNav = () => {
  const routes = useRoutes();
  const { pathname } = useLocation();

  const breadcrumbItems = routes.reduce((acc, route) => {
    if (pathname.includes(route.path)) {
      acc.push({
        label: route.label,
        template: (item) => (
          <Link
            to={route.path}
            className={classNames(
              "text-sm font-quicksand font-semibold",
              "row gap-[5px]",
              route.active ? "text-[#3BB77E]" : "text-[#7E7E7E]"
            )}
          >
            <i className={classNames("text-sm", route.icon)}></i>
            <span className="capitalize">{item.label}</span>
          </Link>
        ),
      });
    }
    return acc;
  }, []);

  return (
    <div className="container max-sm:hidden">
      <BreadCrumb
        model={breadcrumbItems}
        pt={{
          separator: { className: "mx-2.5" },
          separatorIcon: { className: "size-2 text-[#7E7E7E]" },
        }}
      />
    </div>
  );
};

export default BreadCrumbNav;
