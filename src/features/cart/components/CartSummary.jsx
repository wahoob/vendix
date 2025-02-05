import { classNames } from "primereact/utils";

import { Cart } from "../../../utils/icons.utils";

import { useGetCartQuery } from "../cartApiSlice";

const CartSummary = ({ onHide }) => {
  const {
    data: { products, total },
  } = useGetCartQuery();

  return (
    <div className="border-2 border-neutral-300 h-fit max-h-[30rem] overflow-y-auto">
      <div className="px-4 sm:px-6 pt-4 border-b border-neutral-300">
        <div className="flex items-end gap-0.5">
          <div className="row gap-1.5">
            <div className="size-6">
              <Cart />
            </div>
            <h2 className="sm:text-xl font-medium">Cart summary</h2>
          </div>

          <p className="text-xs sm:text-sm">
            [
            <span
              className="font-bold text-[#3BB77E] cursor-pointer"
              onClick={onHide}
            >
              Edit
            </span>
            ]
          </p>
        </div>

        {products.map((item, index) => {
          const { product, quantity } = item;
          const { name, price, description } = product;
          return (
            <div
              key={index}
              className={classNames(
                "py-4",
                index !== products.length - 1 && "border-b-2 border-neutral-300"
              )}
            >
              <div className="flex justify-between gap-4 mb-1">
                <p className="text-sm sm:text-lg font-medium">
                  {quantity} x <span className="capitalize">{name}</span>
                </p>

                <span className="font-semibold">${price}</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 line-clamp-2">
                {description}
              </p>
            </div>
          );
        })}
      </div>

      <div
        className={classNames(
          "grid grid-cols-2 gap-x-1",
          "px-6 py-2 w-fit ml-auto",
          "[&>span]:font-semibold max-md:text-xs"
        )}
      >
        <h4>Shipping:</h4>
        <span>Free</span>
        <h4>Sub total:</h4>
        <span>${total}</span>
      </div>
    </div>
  );
};

export default CartSummary;
