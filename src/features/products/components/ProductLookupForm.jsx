import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideSearchResults,
  selectProductsUI,
  showSearchResults,
} from "../productSlice";

const ProductLookupForm = ({ searchTerm, handleChange }) => {
  const { isInputFocused } = useSelector(selectProductsUI);
  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const show = () => dispatch(showSearchResults());
  const hide = () => dispatch(hideSearchResults());

  useEffect(() => {
    if (isInputFocused) {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
    }
  }, [isInputFocused]);

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
        onClick={show}
      />
    </form>
  );
};

export default ProductLookupForm;
