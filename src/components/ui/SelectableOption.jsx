import { Checkbox } from "../";

const SelectableOption = ({ label, id, isChecked, onCheckboxChange }) => {
  return (
    <div className="flex gap-2">
      <Checkbox
        inputId={id}
        checked={isChecked}
        onChange={() => onCheckboxChange(id)}
      />

      <label htmlFor={id} className="text-sm text-[#687188] capitalize">
        {label}
      </label>
    </div>
  );
};

export default SelectableOption;
