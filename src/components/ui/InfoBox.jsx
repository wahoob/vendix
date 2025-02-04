import { classNames } from "primereact/utils";
import { getClassNames } from "../../utils/functions.utils";

const InfoBox = ({ label, value, description, pt }) => {
  return (
    <div
      className={classNames(
        "flex gap-4",
        "bg-white border border-[#EEEEEE] rounded-xl p-5"
      )}
    >
      <div
        className={classNames(
          "size-14 rounded-full row justify-center shrink-0",
          getClassNames(pt, "bgIcon")
        )}
      >
        <i className={classNames("pi text-xl", getClassNames(pt, "icon"))} />
      </div>

      <div>
        <h4 className="font-bold text-lg mb-2">{label}</h4>

        <h3 className="font-bold text-3xl font-lato text-[#4E5C76] mb-1">
          {value}
        </h3>

        <p className="font-bold text-[#7E868D] text-sm">{description}</p>
      </div>
    </div>
  );
};

export default InfoBox;
