import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { formatShortDate } from "../../../utils/functions.utils";

import { useGetInvoicesQuery } from "../invoicesApiSlice";

const InvoicesList = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data, isFetching, isLoading } = useGetInvoicesQuery({ page });

  return (
    <DataTable
      value={data?.invoices}
      paginator
      lazy
      rows={10}
      totalRecords={data?.total}
      first={page}
      onPage={(e) => setPage(e.page + 1)}
      dataKey="id"
      loading={isLoading || isFetching}
    >
      <Column field="invoiceNumber" header="Invoice Number" pt={{}} />
      <Column
        field="createdAt"
        header="Created Date"
        body={({ createdAt }) => {
          return formatShortDate(createdAt);
        }}
      />
      <Column
        header="Action"
        body={(invoice) => (
          <Button
            label="View details"
            severity="success"
            pt={{
              root: "bg-[#3BB77E] px-4 py-2",
              label: "text-white font-normal text-xs",
            }}
            onClick={() => navigate(invoice.id)}
          />
        )}
      />
    </DataTable>
  );
};

export default InvoicesList;
