import { classNames } from "primereact/utils";

const DiscountCountdown = ({ formattedTime }) => {
  return (
    <div className="row gap-[3px]">
      {formattedTime.map(({ label, value }) => (
        <div key={label}>
          <div
            className={classNames(
              "border border-[#E4E5E9] rounded-[5px]",
              "size-[3.125rem]",
              "row justify-center flex-col"
            )}
          >
            <p className="font-bold text-xl leading-5 text-[#010F1C]">
              {value}
            </p>
            <p className="font-medium text-[10px] leading-[10px] text-[#55585B]">
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscountCountdown;
