import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useRef } from "react";

const ProductLookupForm = ({ searchTerm, handleChange, show, hide }) => {
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleButtonFocus = () => {
    show();
    inputRef.current.focus();
  };

  return (
    <form className="row justify-between flex-1" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for items..."
        className={classNames(
          "text-sm placeholder:text-[#838383] text-[#253D4E]",
          "outline-0 w-full"
        )}
        value={searchTerm}
        onChange={handleChange}
        onFocus={show}
        onBlur={hide}
        ref={inputRef}
      />

      <Button
        type="submit"
        icon="pi pi-search"
        severity="success"
        className="text-[#8A8A8A] size-5"
        onClick={handleButtonFocus}
      />
    </form>
  );
};

export default ProductLookupForm;
