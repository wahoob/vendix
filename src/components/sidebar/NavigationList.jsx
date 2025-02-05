import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";

import { Compare, Cart, Person, Heart } from "../../utils/icons.utils";

import { TitleLabel } from "../";

const NavigationList = () => {
  const navigate = useNavigate();

  const items = [
    { label: "Cart", Icon: Cart, command: () => navigate("/") },
    { label: "Wishlist", Icon: Heart, command: () => navigate("/") },
    { label: "Compare", Icon: Compare, command: () => navigate("/") },
    { label: "Account", Icon: Person, command: () => navigate("/") },
  ];

  const content = (
    <div
      className={classNames(
        "font-quicksand text-[#253D4E] font-medium",
        "px-[31px] space-y-1"
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
              "cursor-pointer hover:shadow-shadow2 transition-all duration-300"
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
