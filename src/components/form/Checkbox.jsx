import { classNames } from "primereact/utils";

const Checkbox = ({ inputId, checked, onChange, size = 16 }) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        className={classNames(
          "appearance-none rounded-sm cursor-pointer",
          "border-[#CED4DA]",
          checked ? "bg-[#3BB77E]" : "bg-white border-2"
        )}
        style={{ width: `${size}px`, height: `${size}px` }}
        value={checked}
        onChange={onChange || null}
        id={inputId}
      />

      <div
        className={classNames(
          "absolute top-1.5 left-1/2 -translate-x-1/2 -rotate-45",
          "border-b-2 border-l-2 border-white",
          "pointer-events-none",
          !checked && "hidden"
        )}
        style={{ width: `${size - 5}px`, height: `${size - 11}px` }}
      />
    </div>
  );
};

export default Checkbox;
