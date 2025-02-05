import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Menu } from "primereact/menu";
import { useRef } from "react";

import { logo, person } from "../../assets/images";

const DashboardNavbar = ({ toggle }) => {
  const menuRef = useRef(null);

  const items = [
    {
      label: "Options",
      items: [
        {
          label: "Home",
          icon: "pi pi-home",
        },
        {
          label: "Notifications",
          icon: "pi pi-bell",
        },
        {
          label: "Light mode",
          icon: "pi pi-moon",
        },
        {
          label: "Website",
          icon: "pi pi-globe",
        },
        {
          label: "Share",
          icon: "pi pi-share-alt",
        },
        {
          label: "Logout",
          icon: "pi pi-sign-out",
        },
      ],
    },
  ];

  return (
    <div className="flex w-full border-b">
      <div
        className={classNames("row flex-1", "p-4 md:pr-6 max-w-80 md:border-r")}
      >
        <Button
          icon="pi pi-bars"
          pt={{
            icon: "text-xl",
          }}
          severity="secondary"
          onClick={toggle}
        />
        <Link to="/" className="sm:max-w-44">
          <img src={logo} alt="logo" className="max-w-40" />
        </Link>
      </div>

      <div className="row justify-between pr-4 md:px-12 flex-1 md:gap-4">
        <div
          className={classNames(
            "row flex-1 max-w-96",
            "bg-[#F4F5F9] rounded-md max-md:hidden"
          )}
        >
          <input
            placeholder="Search term"
            className={classNames(
              "bg-transparent outline-none text-sm",
              "flex-1 w-full py-3 px-6"
            )}
          />
          <i
            className={classNames(
              "pi pi-search",
              "text-sm text-neutral-400",
              "px-4 border-l-2"
            )}
          />
        </div>

        <div className="row gap-4 ml-auto">
          <div className="row gap-5 max-sm:hidden">
            <div className="relative">
              <i className="pi pi-bell text-xl" />
              <div
                className={classNames(
                  "absolute -top-3 -right-4",
                  "size-5 row justify-center",
                  "bg-[#3BB77E] text-white text-xs rounded-full"
                )}
              >
                3
              </div>
            </div>

            <i className="pi pi-moon text-xl" />
            <i className="pi pi-globe text-xl" />
            <i className="pi pi-share-alt text-xl" />
          </div>

          <div
            className="row gap-0.5 cursor-pointer shrink-0"
            onClick={(e) => menuRef.current.toggle(e)}
          >
            <img
              src={person}
              alt="person"
              className="size-9 rounded-full object-cover"
            />
            <i className="pi pi-ellipsis-v text-sm" />
            <Menu model={items} popup ref={menuRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
