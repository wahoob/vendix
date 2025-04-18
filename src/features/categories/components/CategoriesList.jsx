import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";

import { useGetCategoriesQuery } from "../categoriesApiSlice";

const CategoriesList = ({ show }) => {
  const [page, setPage] = useState(1);

  const { isFetching, data, isLoading } = useGetCategoriesQuery({ page });

  return (
    <DataTable
      value={data?.categories}
      paginator
      lazy
      rows={10}
      totalRecords={data?.total}
      first={page}
      onPage={(e) => setPage(e.page + 1)}
      dataKey="id"
      loading={isLoading || isFetching}
    >
      <Column field="id" header="ID" />
      <Column field="name" header="Name" />
      <Column
        header="Action"
        body={(category) => (
          <div className="flex gap-2">
            <Button
              icon="pi pi-pencil"
              severity="success"
              pt={{
                root: "bg-[#3BB77E] hover:bg-[#2a9d68] px-3 py-2",
                icon: "text-white",
              }}
              onClick={() => show(category)}
            />
            <Button
              icon="pi pi-trash"
              severity="danger"
              pt={{
                root: "bg-red-500 hover:bg-red-600 px-3 py-2",
                icon: "text-white",
              }}
            />
          </div>
        )}
      />
    </DataTable>
  );
};

export default CategoriesList;
