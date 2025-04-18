import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { useEffect } from "react";

import { useGetCategoriesQuery } from "../categoriesApiSlice";

const CategoryDropdown = ({ selectedCategory, setSelectedCategory }) => {
  const { isLoading, data, isError, isSuccess, isFetching } =
    useGetCategoriesQuery({});

  let placeholderText;
  if (isLoading || isFetching) {
    placeholderText = "Loading...";
  } else if (isSuccess) {
    placeholderText = selectedCategory;
  } else if (isError) {
    placeholderText = "Error...";
  }
  useEffect(() => {
    if (isSuccess) {
      setSelectedCategory(data.categories[0]);
    }
  }, [isSuccess, data, setSelectedCategory]);

  return (
    <Dropdown
      loading={isLoading || isFetching}
      placeholder={placeholderText}
      onChange={(e) => setSelectedCategory(e.value)}
      options={data?.categories}
      value={selectedCategory}
      optionLabel="name"
      pt={{
        root: {
          className: classNames("gap-1 sm:gap-3", "w-[5.8rem] sm:w-[7.11rem]"),
        },
        input: {
          className:
            "text-xs sm:text-sm text-[#253D4E] font-bold font-quicksand capitalize",
        },
        trigger: {
          className: classNames(
            "size-2",
            isError
              ? "text-red-500"
              : "text-[#7E7E7E] group-hover:text-neutral-800",
          ),
        },
        item: {
          className: "text-xs sm:text-sm font-quicksand font-bold capitalize",
        },
      }}
      dropdownIcon={isError && "pi pi-exclamation-triangle"}
    />
  );
};

export default CategoryDropdown;
