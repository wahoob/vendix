import { Button } from "primereact/button";
import { classNames } from "primereact/utils";

import { AsyncContentWrapper } from "../../../components";
import DealProduct from "./DealProduct";

import { useGetDealsQuery } from "../productsApiSlice";

const DealsProducts = () => {
  const { isError, error, isLoading, isSuccess, data, isFetching } =
    useGetDealsQuery();

  return (
    <div className="bg-[#EAE2DE] w-full font-roboto">
      <div className="container py-[4.5rem] space-y-10">
        <div>
          <div className="relative row max-md:flex-col gap-y-3 justify-between">
            <h3 className="text-[#021D35] text-4xl font-bold">
              Deals of The Day
            </h3>

            <div
              className={classNames(
                "bg-[#ECF2F7] pl-[3.125rem] w-fit ml-auto max-md:relative",
                "before:h-0.5 before:w-[200%] md:before:w-[60%] before:bg-[#ECF2F7] before:z-10",
                "before:absolute before:right-0 before:top-1/2 before:-translate-y-1/2"
              )}
            >
              <Button
                label="View All Products"
                icon="pi pi-arrow-right"
                iconPos="right"
                pt={{
                  root: {
                    className: classNames(
                      "px-6 py-2.5 z-20",
                      "bg-[#3BB77E] rounded-md",
                      "text-white"
                    ),
                  },
                  label: { className: "text-sm text-medium" },
                }}
                severity="success"
              />
            </div>
          </div>
        </div>

        <AsyncContentWrapper
          error={error}
          isError={isError}
          isLoading={isLoading}
          isFetching={isFetching}
          isSuccess={isSuccess}
          render={() => (
            <div className="grid md:grid-cols-3 gap-[1.875rem]">
              {data.map((deal) => (
                <DealProduct key={deal.id} {...deal} />
              ))}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default DealsProducts;
