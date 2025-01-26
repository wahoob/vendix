import { classNames } from "primereact/utils";
import { useImperativeHandle } from "react";
import { forwardRef, useState } from "react";

const ProgressStepper = ({ steps, initial = 0 }, ref) => {
  const [current, setCurrent] = useState(initial);

  useImperativeHandle(
    ref,
    () => ({
      setCurrent: (step) => {
        if (step >= 1 && step <= steps.length) {
          setCurrent(step);
        }
      },
      next: () =>
        setCurrent((prev) => (prev + 1 <= steps.length ? prev + 1 : prev)),
      prev: () => setCurrent((prev) => (prev - 1 >= 1 ? prev - 1 : prev)),
      getCurrent: () => current,
    }),
    [steps, current]
  );

  return (
    <div className="row gap-3">
      {steps.map((step, index) => {
        const isChecked = index < current;
        const isProgressing = index === current;
        const isDisabled = index > current;
        const isLast = index === steps.length - 1;

        return (
          <div key={index} className="row gap-1.5">
            <div
              className={classNames(
                "row justify-center size-6 rounded-full",
                "border-2",
                {
                  "bg-[#2AB729] border-[#2AB729]": isChecked,
                  "bg-white border-[#2AB729]": isProgressing,
                  "bg-gray-200 border-gray-200": isDisabled,
                }
              )}
            >
              {isChecked ? (
                <i className="pi pi-check text-white text-xs" />
              ) : (
                <span
                  className={classNames("text-sm font-semibold", {
                    "text-gray-400": isDisabled,
                    "text-[#2AB729]": !isDisabled,
                  })}
                >
                  {index + 1}
                </span>
              )}
            </div>

            <span
              className={classNames("font-medium text-[13px]", {
                "text-gray-400": isDisabled,
              })}
            >
              {step}
            </span>

            {!isLast && (
              <span
                className={classNames("h-[3px] w-20 rounded-full", {
                  "bg-[#2AB729]": isChecked,
                  "bg-gray-200": !isChecked,
                })}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default forwardRef(ProgressStepper);
