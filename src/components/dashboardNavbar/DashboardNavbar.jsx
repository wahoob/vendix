import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Menu } from "primereact/menu";
import { useRef } from "react";

import { logo, person } from "../../assets/images";

import { useSendLogoutMutation } from "../../features/auth";

const DashboardNavbar = ({ toggle }) => {
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const [logout] = useSendLogoutMutation();

  const sendLogout = async () => {
    await logout().unwrap();
    navigate("/auth/login");
  };

  const items = [
    {
      label: "Options",
      items: [
        {
          label: "Settings",
          icon: "pi pi-home",
          command: () => {
            navigate("/dashboard/profile-settings");
          },
        },
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          command: sendLogout,
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

      <div className="row justify-end pr-4 md:px-12 flex-1">
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
  );
};

export default DashboardNavbar;
