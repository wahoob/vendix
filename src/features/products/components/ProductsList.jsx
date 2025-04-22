import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { classNames } from "primereact/utils";

import { formatShortDate } from "../../../utils/functions.utils";

import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../productsApiSlice";

const ProductsList = ({ show, vendorId }) => {
  const [page, setPage] = useState(1);

  const { data, isFetching, isLoading } = useGetProductsQuery({
    page,
    vendors: vendorId ? vendorId : undefined,
  });
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    try {
      await deleteProduct({ id }).unwrap();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <DataTable
      value={data?.products}
      paginator
      lazy
      rows={10}
      totalRecords={data?.total}
      first={page}
      onPage={(e) => setPage(e.page + 1)}
      dataKey="id"
      loading={isLoading || isFetching}
    >
      <Column
        header="Product"
        body={({ images, name }) => (
          <div className="row gap-4">
            <img
              src={images[0]}
              alt={name}
              className="size-16 rounded-lg object-cover"
            />
            <p className="max-w-64 truncate leading-normal font-medium">
              {name}
            </p>
          </div>
        )}
      />
      <Column
        field="price"
        header="Price"
        body={({ price }) => <span>${price.toFixed(2)}</span>}
      />
      <Column
        header="Status"
        body={({ isArchived }) => {
          return (
            <div
              className={classNames(
                "text-xs font-semibold capitalize",
                "w-fit py-1 px-3 rounded-full",
                {
                  "text-green-600 bg-green-200": !isArchived,
                  "text-gray-600 bg-gray-200": isArchived,
                },
              )}
            >
              {isArchived ? "archived" : "active"}
            </div>
          );
        }}
      />
      <Column
        header="Created At"
        body={({ createdAt }) => formatShortDate(createdAt)}
      />
      <Column
        header="Action"
        body={(product) => (
          <div className="flex gap-1">
            <Button
              icon="pi pi-pencil"
              severity="success"
              pt={{
                root: "bg-[#3BB77E] px-3 py-2",
                icon: "text-white text-sm",
              }}
              onClick={() => show(product)}
            />
            <Button
              icon="pi pi-trash"
              severity="danger"
              pt={{
                root: "bg-red-500 px-3 py-2",
                icon: "text-white text-sm",
              }}
              onClick={() => handleDelete(product.id)}
            />
          </div>
        )}
      />
    </DataTable>
  );
};

export default ProductsList;
