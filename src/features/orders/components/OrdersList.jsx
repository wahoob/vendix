import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";

import { useGetOrdersQuery } from "../ordersApiSlice";

import { formatShortDate } from "../../../utils/functions.utils";

const OrdersList = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data, isFetching, isLoading } = useGetOrdersQuery({ page });

  return (
    <DataTable
      value={data?.orders}
      paginator
      lazy
      rows={10}
      totalRecords={data?.total}
      first={page}
      onPage={(e) => setPage(e.page + 1)}
      dataKey="id"
      loading={isLoading || isFetching}
    >
      <Column field="paymentStatus" header="Payment Status" />
      <Column header="Total" body={({ total }) => <p>${total.toFixed(2)}</p>} />
      <Column
        header="ShippingFee"
        body={({ shippingFee }) => <p>${shippingFee.toFixed(2)}</p>}
      />
      <Column
        header="Status"
        body={({ orderStatus }) => {
          const pending = orderStatus === "pending";
          const shipped = orderStatus === "shipped";
          const delivered = orderStatus === "delivered";
          const cancelled = orderStatus === "cancelled";

          return (
            <div
              className={classNames(
                "text-[#006D0E] text-xs font-semibold capitalize",
                "w-fit py-1 px-3 rounded-full bg-[#CCF0D1]",
                {
                  "text-yellow-600 bg-yellow-200": pending,
                  "text-orange-600 bg-orange-200": shipped,
                  "text-green-600 bg-green-200": delivered,
                  "text-red-600 bg-red-200": cancelled,
                },
              )}
            >
              {orderStatus}
            </div>
          );
        }}
      />
      <Column
        field="createdAt"
        header="Created Date"
        body={({ createdAt }) => {
          return formatShortDate(createdAt);
        }}
      />
      <Column
        header="Action"
        body={(order) => (
          <Button
            label="View details"
            severity="success"
            pt={{
              root: "bg-[#3BB77E] px-4 py-2",
              label: "text-white font-normal text-xs",
            }}
            onClick={() => navigate(order._id)}
          />
        )}
      />
    </DataTable>
  );
};

export default OrdersList;
