import { classNames } from "primereact/utils";

import { AsyncContentWrapper } from "../../../components";

import { useGetCategoriesQuery } from "../categoriesApiSlice";
import useHorizontalScroll from "../hooks/useHorizontalScroll";

const CategoryNavigationBar = ({ selected, onChange }) => {
  const { isError, error, isLoading, isSuccess, data, isFetching } =
    useGetCategoriesQuery({});
  const {
    translate,
    isLeftVisible,
    isRightVisible,
    slideRight,
    slideLeft,
    containerRef,
  } = useHorizontalScroll(data);

  return (
    <AsyncContentWrapper
      isSuccess={isSuccess}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      error={error}
      render={() => (
        <div className="relative overflow-hidden select-none">
          {isLeftVisible && (
            <i
              className={classNames(
                "pi pi-angle-left",
                "absolute left-0 top-1/2 -translate-y-1/2 z-30",
                "row justify-start w-10",
                "bg-gradient-to-r from-white from-50% to-transparent",
                "cursor-pointer",
              )}
              onClick={slideLeft}
            ></i>
          )}

          <ul
            className={classNames("row gap-4", "transition-all duration-200")}
            style={{ transform: `translateX(${-translate}px)` }}
            ref={containerRef}
          >
            {data.categories.map((category) => {
              const { id } = category;
              const isSelected = Array.isArray(selected)
                ? selected.includes(id)
                : selected === id;
              return (
                <li
                  key={category.id}
                  className={classNames(
                    "font-semibold",
                    "capitalize hover:text-[#3BB77E]",
                    "cursor-pointer whitespace-nowrap",
                    isSelected ? "text-[#3BB77E]" : "text-[#253D4E]",
                  )}
                  onClick={() => onChange(category.id)}
                >
                  {category.name}
                </li>
              );
            })}
          </ul>

          {isRightVisible && (
            <i
              className={classNames(
                "pi pi-angle-right",
                "absolute right-0 top-1/2 -translate-y-1/2 z-30",
                "row justify-end w-10",
                "bg-gradient-to-l from-white from-50% to-transparent",
                "cursor-pointer",
              )}
              onClick={slideRight}
            ></i>
          )}
        </div>
      )}
    />
  );
};

export default CategoryNavigationBar;
