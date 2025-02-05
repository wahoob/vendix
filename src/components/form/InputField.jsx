import { classNames } from "primereact/utils";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { getClassNames } from "../../utils/functions.utils";

const InputField = ({
  icon,
  name,
  initialValue = "",
  type = "text",
  disabled = false,
  register,
  placeholder,
  error,
  pt,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={twMerge(
        "w-full row gap-3",
        "border px-5 py-[11px] rounded-lg",
        error ? "border-red-400" : "border-[#E0E2E9]",
        getClassNames(pt, "root")
      )}
    >
      {icon && (
        <i
          className={classNames(
            "text-[#ADB0CD]",
            icon,
            getClassNames(pt, "icon")
          )}
        />
      )}
      <input
        id={name}
        name={name}
        type={show ? "text" : type}
        defaultValue={initialValue}
        disabled={disabled}
        placeholder={placeholder}
        {...(register ? register(name) : null)}
        className={classNames(
          "w-full flex-1 outline-none",
          "text-sm placeholder:text-[#969AB8]",
          getClassNames(pt, "input")
        )}
      />
      {type === "password" && (
        <i
          className={classNames(
            "pi text-[#ADB0CD] cursor-pointer",
            {
              "pi-eye-slash": show,
              "pi-eye": !show,
            },
            getClassNames(pt, "showIcon")
          )}
          onClick={() => setShow(!show)}
        />
      )}
    </div>
  );
};

export default InputField;
