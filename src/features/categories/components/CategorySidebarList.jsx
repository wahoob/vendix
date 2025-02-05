import { classNames } from "primereact/utils";

import { AsyncContentWrapper, TitleLabel } from "../../../components";
import CategorySidebarItem from "./CategorySidebarItem";

import { useGetCategoriesQuery } from "../categoriesApiSlice";

const CategorySidebarList = () => {
  const { isLoading, data, isError, isSuccess, error, isFetching } =
    useGetCategoriesQuery();

  return (
    <div
      className={classNames(
        "border border-[#ECECEC] rounded-2xl shadow-shadow1",
        "h-[28.1rem] overflow-y-auto overflow-x-hidden",
        "space-y-[30px] relative"
      )}
    >
      <TitleLabel title="Category" />

      <div className="flex px-[31px] pb-[31px]">
        <div className="shrink-0">
          <AsyncContentWrapper
            isSuccess={isSuccess}
            isError={isError}
            isLoading={isLoading}
            isFetching={isFetching}
            error={error}
            render={() => (
              <div className="flex flex-col gap-[15px]">
                {data.map((category) => (
                  <CategorySidebarItem key={category.id} {...category} />
                ))}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CategorySidebarList;
