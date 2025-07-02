import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";

import { Cart, Person, Heart } from "../../utils/icons.utils";

import { TitleLabel } from "../";
import { useAuth } from "../../features/auth";

const NavigationList = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const items = [];
  if (isLoggedIn) {
    items.push(
      { label: "Cart", Icon: Cart, command: () => navigate("/cart") },
      { label: "Wishlist", Icon: Heart, command: () => navigate("/wishlist") },
      {
        label: "Settings",
        Icon: Person,
        command: () => navigate("/dashboard/profile-settings"),
      },
    );
  } else {
    items.push({
      label: "Login",
      Icon: Person,
      command: () => navigate("/auth/login"),
    });
  }

  const content = (
    <div
      className={classNames(
        "font-quicksand text-[#253D4E] font-medium",
        "px-[31px] space-y-1",
      )}
    >
      {items.map((item, index) => {
        const { label, Icon, command } = item;
        return (
          <div
            key={index}
            className={classNames(
              "row gap-2",
              "py-2 px-5",
              "border border-[#F2F3F4] rounded",
              "cursor-pointer hover:shadow-shadow2 transition-all duration-300",
            )}
            onClick={command}
          >
            <div className="size-5">
              <Icon />
            </div>
            <p>{label}</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-4">
      <TitleLabel title="Explore" />

      {content}
    </div>
  );
};

export default NavigationList;
