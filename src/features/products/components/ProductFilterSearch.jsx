import { classNames } from "primereact/utils";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

import { setFilters } from "../productSlice";

const ProductFilterSearch = () => {
  const [value, setValue] = useState("");
  const [debouncedSearchTerm] = useDebounceValue(value, 500);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFilters({ filterType: "search", value: debouncedSearchTerm }));
  }, [debouncedSearchTerm, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="row flex-col gap-5 sm:gap-10">
      <h1 className="text-4xl sm:text-6xl text-[#253D4E] font-quicksand font-bold">
        Vendix Store
      </h1>

      <form
        onSubmit={handleSubmit}
        className={classNames(
          "row w-full max-w-xl px-7 py-4",
          "border border-[#ECECEC] rounded-full",
          "shadow-shadow4 focus-within:shadow-neutral-300 transition-all"
        )}
      >
        <input
          placeholder="Search in this store..."
          className="placeholder:text-[#838383] text-sm w-full outline-none"
          value={value}
          onFocus={() => setValue((prev) => prev)}
          onBlur={() => setValue("")}
          onChange={(e) => setValue(e.target.value)}
        />
        <i className="pi pi-search" />
      </form>
    </div>
  );
};

export default ProductFilterSearch;
