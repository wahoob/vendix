import { Badge } from "primereact/badge";
import { classNames } from "primereact/utils";

import { Temp } from "../../../utils/icons.utils";

const CategoryItem = ({ id, image, name, badge }) => {
  return (
    <div
      className={classNames(
        "row justify-between gap-4",
        "px-[19px] py-[10px]",
        "border border-[#F2F3F4] rounded-[5px]"
      )}
    >
      <div className="row gap-[15px] shrink-0">
        {/* temp */}
        {image ? (
          <img src={image} alt={name} className="size-[1.875rem]" />
        ) : (
          <Temp />
        )}

        <p className="text-[#253D4E] text-sm font-normal capitalize line-clamp-1">
          {name}
        </p>
      </div>

      <Badge
        value={3}
        size="1.5rem"
        className={classNames(
          "bg-[#BCE3C9]",
          "text-[#253D4E] text-xs font-normal",
          "row justify-center"
        )}
      />
    </div>
  );
};

export default CategoryItem;
