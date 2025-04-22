import { Button } from "primereact/button";
import { PanelMenu } from "primereact/panelmenu";
import { classNames } from "primereact/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { logo } from "../../assets/images";

const DashboardSidebar = ({ isOpen, close }) => {
  const { pathname } = useLocation();
  const [activeItem, setActiveItem] = useState(pathname.split("/").pop());

  const navigate = useNavigate();

  const handleItemClick = ({ item }) => {
    setActiveItem(item.key);

    const link =
      item.key === "dashboard" ? "/dashboard" : `/dashboard/${item.key}`;
    navigate(link);
  };

  const items = [
    {
      key: "dashboard",
      label: "dashboard",
      icon: "pi pi-chart-bar",
      items: [
        {
          key: "dashboard",
          label: "statistics",
          icon: "pi pi-circle-fill",
        },
      ],
    },
    {
      key: "profile",
      label: "profile",
      icon: "pi pi-user",
      items: [
        {
          key: "profile-settings",
          label: "profile settings",
          icon: "pi pi-circle-fill",
        },
      ],
    },
    {
      key: "users",
      label: "users",
      icon: "pi pi-users",
      items: [
        {
          key: "users",
          label: "view all users",
          icon: "pi pi-circle-fill",
        },
      ],
    },
    {
      key: "vendors",
      label: "vendors",
      icon: "pi pi-shop",
      items: [
        {
          key: "vendors",
          label: "view all vendors",
          icon: "pi pi-circle-fill",
        },
      ],
    },
    {
      key: "orders-invoices",
      label: "orders & invoices",
      icon: "pi pi-money-bill",
      items: [
        {
          key: "orders",
          label: "view all orders",
          icon: "pi pi-circle-fill",
        },
        {
          key: "invoices",
          label: "view all invoices",
          icon: "pi pi-circle-fill",
        },
      ],
    },
    {
      key: "reviews",
      label: "reviews",
      icon: "pi pi-comments",
      items: [
        {
          key: "reviews",
          label: "view all reviews",
          icon: "pi pi-circle-fill",
        },
      ],
    },
    {
      key: "categories",
      label: "categories",
      icon: "pi pi-folder",
      items: [
        {
          key: "categories",
          label: "view all categories",
          icon: "pi pi-circle-fill",
        },
      ],
    },
    {
      key: "products",
      label: "products",
      icon: "pi pi-shopping-bag",
      items: [
        {
          key: "products",
          label: "view all products",
          icon: "pi pi-circle-fill",
        },
        {
          key: "products/new",
          label: "add product",
          icon: "pi pi-circle-fill",
        },
        {
          key: "products/my-products",
          label: "my products",
          icon: "pi pi-circle-fill",
        },
      ],
    },
  ];

  items.forEach((headerAction) => {
    headerAction.items.forEach((action) => (action.command = handleItemClick));
  });

  return (
    <div
      className={classNames(
        "h-full w-full max-w-80 shrink-0",
        "border-r bg-white max-lg:absolute top-0",
        "transition-all duration-500 z-50",
        {
          "left-0": isOpen,
          "lg:hidden max-lg:-left-96": !isOpen,
        },
      )}
    >
      <div className="row border-b p-4 lg:hidden">
        <Button
          icon="pi pi-bars"
          pt={{
            icon: "text-xl",
          }}
          severity="secondary"
          onClick={close}
        />
        <Link to="/" className="sm:max-w-44">
          <img src={logo} alt="logo" className="max-w-40" />
        </Link>
      </div>

      <div className="p-4">
        <PanelMenu
          model={items}
          pt={{
            headerAction: ({ context }) => ({
              className: classNames("gap-1.5 bg-white px-3 py-4 rounded-md", {
                "bg-[#D8F1E5]": context.active,
              }),
            }),
            headerIcon: ({ context }) => ({
              className: classNames("text-xl", {
                "text-[#3BB77E]": context.active,
              }),
            }),
            headerLabel: "text-sm text-neutral-700 capitalize",
            headerSubmenuIcon: "order-1 ml-auto",
            action: ({ context }) => ({
              className: classNames("pl-10 gap-1 hover:bg-white py-2", {
                "bg-white": context.active || context.focused,
              }),
            }),
            icon: "text-[6px] text-neutral-400",
            label: ({ context }) => ({
              className: classNames(
                "text-sm text-neutral-500 font-semibold capitalize",
                {
                  "text-[#3BB77E]": context.item.key === activeItem,
                },
              ),
            }),
            submenuicon: "order-1 ml-auto",
          }}
        />
      </div>
    </div>
  );
};

export default DashboardSidebar;
