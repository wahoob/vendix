import { classNames } from "primereact/utils";
import { useState } from "react";

const InputField = ({
  icon,
  name,
  type = "text",
  register,
  placeholder,
  error,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={classNames(
        "w-full row gap-3",
        "border px-5 py-[11px] rounded-lg",
        {
          "border-red-400": error,
          "border-[#E0E2E9]": !error,
        }
      )}
    >
      {icon && <i className={classNames("text-[#ADB0CD]", icon)} />}
      <input
        id={name}
        name={name}
        type={show ? "text" : type}
        placeholder={placeholder}
        {...register(name)}
        className={classNames(
          "w-full flex-1 outline-none",
          "text-sm placeholder:text-[#969AB8]"
        )}
      />
      {type === "password" && (
        <i
          className={classNames("pi text-[#ADB0CD] cursor-pointer", {
            "pi-eye-slash": show,
            "pi-eye": !show,
          })}
          onClick={() => setShow(!show)}
        />
      )}
    </div>
  );
};

export default InputField;
