import { classNames } from "primereact/utils";
import { AsyncContentWrapper, InfoBox } from "../../../components";
import { useGetProductsOverviewQuery } from "../productsApiSlice";

const StatsPanel = () => {
  const { isError, isFetching, isLoading, isSuccess, error, data } =
    useGetProductsOverviewQuery();

  return (
    <AsyncContentWrapper
      error={error}
      isError={isError}
      isFetching={isFetching}
      isLoading={isLoading}
      isSuccess={isSuccess}
      render={() => (
        <div
          className={classNames(
            "flex flex-wrap [&>*]:min-w-72 [&>*]:flex-1",
            "gap-3 lg:gap-6"
          )}
        >
          <InfoBox
            label="Revenue"
            value={`$${data.revenue}`}
            description="Shipping fees are not included"
            pt={{
              bgIcon: "bg-[#D8F1E5]",
              icon: "pi-money-bill text-[#3BB77E]",
            }}
          />
          <InfoBox
            label="Orders"
            value={data.orders}
            description="Including orders in transit"
            pt={{
              bgIcon: "bg-[#D8F1E5]",
              icon: "pi-truck text-[#3BB77E]",
            }}
          />
          <InfoBox
            label="Products"
            value={data.products}
            description={`In ${data.categories} Categories`}
            pt={{
              bgIcon: "bg-[#FFE8D0]",
              icon: "pi-objects-column text-[#FD8A14]",
            }}
          />
          <InfoBox
            label="Monthly Earning"
            value={`$${data.monthlyEarning}`}
            description="Based in your local time"
            pt={{
              bgIcon: "bg-[#CFF4E8]",
              icon: "pi-paypal text-[#0DCAF0]",
            }}
          />
        </div>
      )}
    />
  );
};

export default StatsPanel;
