import { classNames } from "primereact/utils";
import { AsyncContentWrapper } from "../../../components";
import { useGetCartQuery } from "../cartApiSlice";
import CartItem from "./CartItem";
import { Button } from "primereact/button";

const CartTable = ({ toast }) => {
  const { data, isError, isFetching, isLoading, isSuccess, error } =
    useGetCartQuery();

  return (
    <div className="font-quicksand">
      <div className="font-bold text-[#243B4D]">
        <div
          className={classNames(
            "grid grid-cols-[1fr,repeat(2,60px)] md:grid-cols-[1fr,repeat(4,80px)] gap-2 xl:gap-4",
            "text-center bg-[#ECECEC] p-4 rounded-t-xl max-md:text-sm"
          )}
        >
          <span className="text-left">Product</span>
          <span className="max-md:hidden">Unit Pirce</span>
          <span>Quantity</span>
          <span className="max-md:hidden">Subtotal</span>
          <span>Remove</span>
        </div>

        <div
          className={classNames(
            "border-x border-[#F4F5F7]",
            isLoading && "mt-4"
          )}
        >
          <AsyncContentWrapper
            isFetching={isFetching}
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
            error={error}
            render={() =>
              data.products.length > 0 ? (
                data.products.map((item) => (
                  <CartItem
                    key={item._id}
                    {...item}
                    {...item.product}
                    toast={toast}
                  />
                ))
              ) : (
                <div className="mt-4">
                  <h3 className="text-center text-2xl">No Products yet</h3>
                  <Button label="" />
                </div>
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CartTable;
