import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";

const VerticalDivider = ({ fullHeight = false }) => {
  return (
    <Divider
      layout="vertical"
      className={classNames("bg-[#DEDFE2]", {
        "h-[10px]": !fullHeight,
        "h-full": fullHeight,
      })}
    />
  );
};

export default VerticalDivider;
