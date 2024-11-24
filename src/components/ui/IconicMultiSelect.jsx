import { classNames } from "primereact/utils";
import { getClassNames } from "../../utils/functions.utils";
import { useEffect, useRef, useState } from "react";
import { Checkbox } from "../";

const IconicMultiSelect = ({
  options,
  Icon,
  fixedPlaceholder,
  onChange,
  pt,
  partClassNames,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const containerRef = useRef(null);

  const handleSelectedChange = (selectedItem, groupKey) => {
    const updatedItems = selectedItems.filter(
      (item) => item.groupKey !== groupKey
    );
    updatedItems.push({ ...selectedItem, groupKey });

    const event = {
      values: updatedItems.map((item) => item.value),
      labels: updatedItems.map((item) => item.label),
    };

    setSelectedItems(updatedItems);

    if (onChange) onChange(event);
  };

  useEffect(() => {
    const handleClose = (e) => {
      if (!containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener("click", handleClose);
    document.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("click", handleClose);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative select-none" ref={containerRef}>
      <div
        className={classNames("row cursor-pointer", getClassNames(pt, "root"))}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={classNames(
            "row cursor-pointer",
            getClassNames(partClassNames, "root")
          )}
        >
          <div className={getClassNames(partClassNames, "icon")}>
            <Icon />
          </div>

          <p className={getClassNames(partClassNames, "text")}>
            {fixedPlaceholder}
            <span className={getClassNames(partClassNames, "selectedItems")}>
              {selectedItems.length} Featured
            </span>
          </p>
        </div>

        <i
          className={classNames("pi", getClassNames(pt, "icon"), {
            "pi-chevron-up": isOpen,
            "pi-chevron-down": !isOpen,
          })}
        />
      </div>

      {isOpen && (
        <div
          className={classNames(
            "absolute right-0 top-full z-40",
            "w-full bg-white pt-2 shadow-shadow5 rounded-lg",
            "origin-top transition-all ease-in",
            "animate-openPanel",
            getClassNames(pt, "panel")
          )}
        >
          {options.map((option, groupIndex) => (
            <ul key={groupIndex} className={getClassNames(pt, "group")}>
              <li
                className={classNames(
                  "px-3.5 py-1",
                  getClassNames(pt, "groupLabel")
                )}
              >
                {option.label}
              </li>
              {option.items.map((item, index) => {
                const { label, value } = item;
                const selected = selectedItems.some(
                  (item) => item.value === value
                );

                return (
                  <li
                    key={index}
                    className={classNames(
                      "row gap-2",
                      "py-2.5 px-2",
                      {
                        "bg-[#F3F4F6] hover:bg-[#E5E5E5]": selected,
                        "hover:bg-[#F3F4F6]": !selected,
                      },
                      getClassNames(pt, "item")
                    )}
                    onClick={() => handleSelectedChange(item, groupIndex)}
                  >
                    <Checkbox
                      size={pt.checkboxSize}
                      inputId={option.value}
                      checked={selected}
                    />
                    <span>{label}</span>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default IconicMultiSelect;
