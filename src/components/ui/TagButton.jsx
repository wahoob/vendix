import { Badge } from "primereact/badge";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";

const TagButton = ({ Icon, badge, text, className, to }) => {
  const navigate = useNavigate();

  const handleClick = () => to && navigate(to);

  return (
    <button
      className={classNames("row gap-[9px] group", "font-lato", className)}
      onClick={handleClick}
    >
      <div className="relative">
        <div className="text-[#253D4E] group-hover:text-black size-6">
          <Icon />
        </div>

        <Badge
          value={badge > 99 ? "+99" : badge}
          pt={{
            root: ({ props }) => ({
              className: classNames(
                "row justify-center min-w-fit",
                "font-medium bg-[#3BB77E]",
                "absolute -top-2 -right-2.5",
                props.value ? "size-5" : "size-0"
              ),
            }),
          }}
        />
      </div>

      <p className="max-lg:hidden text-[#7E7E7E] hover:text-neutral-800">
        {text}
      </p>
    </button>
  );
};

export default TagButton;
