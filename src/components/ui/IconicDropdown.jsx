import { Dropdown } from "primereact/dropdown";

import { getClassNames } from "../../utils/functions.utils";

const IconicDropdown = ({
  selectedOption,
  onChange,
  options,
  Icon,
  fixedPlaceholder,
  pt,
  partClassNames,
}) => {
  const selectedItemTemplate = (option) => {
    return (
      <div className={getClassNames(partClassNames, "root")}>
        <div className={getClassNames(partClassNames, "icon")}>
          <Icon />
        </div>
        <p className={getClassNames(partClassNames, "text")}>
          {fixedPlaceholder}
          <span className={getClassNames(partClassNames, "option")}>
            {option?.label || selectedOption}
          </span>
        </p>
      </div>
    );
  };

  return (
    <Dropdown
      value={selectedOption}
      onChange={onChange}
      options={options}
      pt={pt}
      valueTemplate={selectedItemTemplate}
    />
  );
};

export default IconicDropdown;
