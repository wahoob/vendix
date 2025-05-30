import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { getClassNames } from "../../utils/functions.utils";

const NumberInput = ({
  onChange,
  minValue = 1,
  maxValue = 99,
  initialValue = 1,
  loading,
  pt,
}) => {
  const [value, setValue] = useState(initialValue);

  const updateValue = (newValue) => {
    const clampedValue = Math.max(minValue, Math.min(maxValue, newValue));

    setValue(clampedValue);
    if (onChange) onChange(clampedValue);
  };

  const handleInputChange = (e) => {
    updateValue(Number(e.target.value));
  };
  const handleIncrement = () => {
    updateValue(value + 1);
  };
  const handleDecrement = () => {
    updateValue(value - 1);
  };

  return (
    <div
      className={twMerge(
        "border-2 border-[#3BB77E] rounded-[5px] overflow-hidden",
        "row gap-2 pl-1 pr-4 py-1.5",
        getClassNames(pt, "root"),
      )}
    >
      {loading ? (
        <i className="pi pi pi-spin pi-spinner mx-auto py-[5px] text-xl text-[#7E7E7E]" />
      ) : (
        <>
          <input
            type="number"
            className={twMerge(
              "outline-none text-center w-12",
              getClassNames(pt, "input"),
            )}
            value={value}
            onChange={handleInputChange}
          />

          <div
            className={twMerge(
              "row flex-col gap-3",
              "[&_*]:text-[#3BB77E] [&_*]:text-[9px] [&_*]:cursor-pointer",
              getClassNames(pt, "arrowsContainer"),
            )}
          >
            <i className="pi pi-chevron-up" onClick={handleIncrement} />
            <i className="pi pi-chevron-down" onClick={handleDecrement} />
          </div>
        </>
      )}
    </div>
  );
};

export default NumberInput;
