import { Button } from "primereact/button";

import { useClearCartMutation, useGetCartQuery } from "../cartApiSlice";

const CartHeader = ({ toast }) => {
  const { data } = useGetCartQuery();
  const [clearCart] = useClearCartMutation();

  const clearCartAction = async () => {
    if (data.totalQuantity) {
      try {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Cart cleared.",
          life: 3000,
        });
        await clearCart().unwrap();
      } catch {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Unable to clear cart.",
          life: 3000,
        });
      }
    }
  };

  return (
    <div className="space-y-2.5">
      <h1 className="text-4xl md:text-5xl font-bold text-[#243B4D]">
        Your Cart
      </h1>
      <div className="row justify-between flex-wrap gap-x-5 gap-y-1">
        <p className="font-bold text-[#7E7E7E]">
          There are{" "}
          <span className="text-[#3BB77E]">{data?.totalQuantity || 0}</span>{" "}
          products in your cart
        </p>

        <Button
          label="Clear Cart"
          icon="pi pi-trash"
          pt={{
            label: "text-[#B6B6B6]",
            icon: "text-[#B6B6B6]",
          }}
          severity="success"
          onClick={clearCartAction}
        />
      </div>
    </div>
  );
};

export default CartHeader;
