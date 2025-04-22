import { Dropdown } from "primereact/dropdown";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { getClassNames } from "../../../utils/functions.utils";

import { useGetCategoriesQuery } from "../categoriesApiSlice";

const CategoryDropdown = ({ selectedCategory, setSelectedCategory, pt }) => {
  const { isLoading, data, isError, isSuccess, isFetching } =
    useGetCategoriesQuery({});

  let placeholderText;
  if (isLoading || isFetching) {
    placeholderText = "Loading...";
  } else if (isSuccess) {
    placeholderText = selectedCategory?.name || selectedCategory;
  } else if (isError) {
    placeholderText = "Error...";
  }
  useEffect(() => {
    if (isSuccess && !selectedCategory) {
      setSelectedCategory(data.categories[0]);
    }
  }, [isSuccess, data, setSelectedCategory, selectedCategory]);

  return (
    <Dropdown
      loading={isLoading || isFetching}
      placeholder={placeholderText}
      onChange={(e) => setSelectedCategory(e.value)}
      options={data?.categories}
      value={selectedCategory}
      optionLabel="name"
      pt={{
        root: twMerge(
          "gap-1 sm:gap-3",
          "w-[5.8rem] sm:w-[7.11rem]",
          getClassNames(pt, "root"),
        ),
        input: twMerge(
          "text-xs sm:text-sm text-[#253D4E] font-bold font-quicksand capitalize",
          getClassNames(pt, "input"),
        ),
        trigger: twMerge(
          "size-2",
          isError
            ? "text-red-500"
            : "text-[#7E7E7E] group-hover:text-neutral-800",
          getClassNames(pt, "trigger"),
        ),
        item: twMerge(
          "text-xs sm:text-sm font-quicksand font-bold capitalize",
          getClassNames(pt, "item"),
        ),
      }}
      dropdownIcon={isError && "pi pi-exclamation-triangle"}
    />
  );
};

export default CategoryDropdown;
