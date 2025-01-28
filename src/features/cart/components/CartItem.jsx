import { Button } from "primereact/button";
import { NumberInput, Rating } from "../../../components";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";

import {
  useRemoveItemMutation,
  useUpdateQuantityMutation,
} from "../cartApiSlice";

const CartItem = ({
  name,
  images,
  rating,
  price,
  quantity,
  _id,
  stockQuantity,
  toast,
}) => {
  const navigate = useNavigate();

  const [removeItem] = useRemoveItemMutation();
  const [updateItemQuantity, { isLoading }] = useUpdateQuantityMutation();

  const removeItemAction = async () => {
    try {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Item has been removed.",
        life: 3000,
      });
      await removeItem({ productId: _id }).unwrap();
    } catch {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Unable to remove item.",
        life: 3000,
      });
    }
  };

  const updateItemAction = async (value) => {
    if (quantity === value) return;

    try {
      await updateItemQuantity({ productId: _id, quantity: value }).unwrap();
      if (value === 0) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Item has been removed.",
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Amount updated.",
          life: 3000,
        });
      }
    } catch {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Unable to update amount.",
        life: 3000,
      });
    }
  };

  return (
    <div
      className={classNames(
        "grid grid-cols-[1fr,repeat(2,60px)] md:grid-cols-[1fr,repeat(4,80px)] gap-2 xl:gap-4 items-center",
        "text-center px-4 py-6",
        "border-b-2 border-[#F4F5F7]"
      )}
    >
      <div className="row gap-2 sm:gap-5">
        <div className="size-28 border border-[#ececec] rounded-xl shrink-0 max-sm:hidden">
          <img
            src={images[0]}
            alt={name}
            className="size-full object-contain"
          />
        </div>

        <div>
          <p
            className={classNames(
              "max-sm:text-sm xl:text-lg",
              "leading-5 text-left line-clamp-2",
              "cursor-pointer capitalize"
            )}
            onClick={() => navigate("/")}
          >
            {name}
          </p>

          <Rating rating={rating} />
        </div>
      </div>

      <p className="text-lg xl:text-2xl text-[#7E7E7E] max-md:hidden">
        ${price}
      </p>

      <NumberInput
        onChange={updateItemAction}
        initialValue={quantity}
        loading={isLoading}
        minValue={0}
        maxValue={stockQuantity}
        pt={{
          root: "max-md:py-1 max-md:w-fit",
          input: "max-md:w-8",
          arrowsContainer: "max-md:gap-1.5",
        }}
      />

      <p className="text-lg xl:text-2xl text-[#3BB77E] max-md:hidden">
        ${(price * quantity).toFixed(2)}
      </p>

      <Button
        icon="pi pi-trash"
        pt={{
          root: "w-fit mx-auto",
          icon: "text-[#7E7E7E]",
        }}
        severity="success"
        onClick={removeItemAction}
      />
    </div>
  );
};

export default CartItem;
