import { ProgressBar } from "primereact/progressbar";

import { AsyncContentWrapper } from "../../../components";

import { useGetProductsOverviewQuery } from "../productsApiSlice";

const TopSellingCategories = () => {
  const { isError, isFetching, isLoading, isSuccess, error, data } =
    useGetProductsOverviewQuery();

  return (
    <div className="flex flex-col justify-between gap-4">
      <AsyncContentWrapper
        error={error}
        isError={isError}
        isFetching={isFetching}
        isLoading={isLoading}
        isSuccess={isSuccess}
        render={() =>
          data.topSellingCategories.map(({ category, productsCount }, idx) => (
            <div key={idx}>
              <p className="text-[#ADB5BD] text-sm">{category}</p>
              <ProgressBar
                value={Math.round((productsCount / data.products) * 100)}
                pt={{
                  root: "h-5 shadow-inner",
                  value: "bg-[#3BB77E]",
                  label: "text-sm",
                }}
              />
            </div>
          ))
        }
      />
    </div>
  );
};

export default TopSellingCategories;
