import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { classNames } from "primereact/utils";
import { forwardRef } from "react";

const ProductsInOrder = ({ items, total, shippingFee }, ref) => {
  return (
    <div className="space-y-4">
      <DataTable value={items}>
        <Column
          header="Product"
          body={(item) => {
            const { product } = item;
            return (
              <div className="row gap-4">
                <div className="bg-[#F7F8F9] rounded size-12" ref={ref}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-contain"
                  />
                </div>
                <h4 className="font-semibold capitalize">{product.name}</h4>
              </div>
            );
          }}
        />
        <Column
          header="Unit Price"
          body={(item) => `$${item.price.toFixed(2)}`}
        />
        <Column field="quantity" header="Quantity" />
        <Column
          header="Total"
          body={(item) => `$${(item.quantity * item.price).toFixed(2)}`}
        />
      </DataTable>

      <div
        className={classNames(
          "grid grid-cols-2 max-w-xs ml-auto",
          "[&>span]:text-right font-medium",
        )}
      >
        <p>Subtotal:</p>
        <span>${total}</span>
        <p>Shipping cost:</p>
        <span>${shippingFee}</span>
        <p>Grand total:</p>
        <span className="text-xl font-bold">${total}</span>
      </div>
    </div>
  );
};

export default forwardRef(ProductsInOrder);
