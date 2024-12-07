import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useDebounceValue } from "usehooks-ts";
import { useState } from "react";

import CategoryDropdown from "../../categories/components/CategoryDropdown";
import ProductLookupResultsPanel from "./ProductLookupResultsPanel";
import ProductLookupForm from "./ProductLookupForm";

import { useSearchProductsQuery } from "../productsApiSlice";
import { useSelector } from "react-redux";
import { selectProductsUI } from "../productSlice";

const ProductLookup = ({ showFullWidth, setShowFullWidth }) => {
  const { isInputFocused } = useSelector(selectProductsUI);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [debouncedSearchTerm] = useDebounceValue(searchTerm, 500);

  const {
    data: searchResult,
    isSuccess: isSearchSuccess,
    isLoading: isSearchLoading,
    isError: isSearchError,
    isFetching: isSearchFetching,
    error: searchError,
  } = useSearchProductsQuery(
    {
      searchTerm: debouncedSearchTerm,
      selectedCategory: selectedCategory?.id !== "all" && selectedCategory.id,
    },
    { skip: !isInputFocused }
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Button
        icon="pi pi-arrow-left"
        severity="success"
        className={classNames(!showFullWidth && "hidden")}
        onClick={() => setShowFullWidth(false)}
      />

      <div
        className={classNames(
          "border-2 border-[#BCE3C9] rounded",
          "py-[17px] px-[22px]",
          "row gap-4 w-full relative"
        )}
      >
        <CategoryDropdown
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Divider layout="vertical" className="h-5 bg-[#CACACA]" />

        <ProductLookupForm
          searchTerm={searchTerm}
          handleChange={handleChange}
        />

        <ProductLookupResultsPanel
          isFetching={isSearchFetching}
          isLoading={isSearchLoading}
          isSuccess={isSearchSuccess}
          isError={isSearchError}
          error={searchError}
          searchResult={searchResult}
        />
      </div>
    </>
  );
};

export default ProductLookup;
