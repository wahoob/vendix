import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { Button } from "primereact/button";

import { AsyncContentWrapper } from "../../../components";

import { useGetOrdersQuery } from "../ordersApiSlice";
import { formatShortDate } from "../../../utils/functions.utils";

const LatestOrders = () => {
  const [selectedProducts, setSelectedProducts] = useState(null);

  const { data, isFetching, isLoading, isError, isSuccess, error } =
    useGetOrdersQuery({ sort: "-createdAt", limit: 6 });

  return (
    <AsyncContentWrapper
      isFetching={isFetching}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      error={error}
      render={() => (
        <DataTable
          value={data}
          selectionMode="checkbox"
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
        >
          <Column selectionMode="multiple" pt={{ root: "w-0" }} />
          <Column
            field="orderStatus"
            header="Order Status"
            pt={{ bodyCell: "text-[#3BB77E]" }}
          />
          <Column field="paymentStatus" header="Payment Status" />
          <Column field="total" header="Total" />
          <Column
            field="createdAt"
            header="Creation Date"
            body={({ createdAt }) => {
              return formatShortDate(createdAt);
            }}
          />
          <Column
            field="updatedAt"
            header="Update Date"
            body={({ updatedAt }) => {
              return formatShortDate(updatedAt);
            }}
          />
          <Column
            body={
              <Button
                label="View details"
                severity="success"
                pt={{
                  root: "bg-[#3BB77E] px-4 py-2",
                  label: "text-white font-normal text-xs",
                }}
              />
            }
          />
        </DataTable>
      )}
    />
  );
};

export default LatestOrders;
