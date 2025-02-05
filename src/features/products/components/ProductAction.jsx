import { useState } from "react";
import { Button } from "primereact/button";

import { ArrowCompare, Cart, Heart } from "../../../utils/icons.utils";

import { NumberInput } from "../../../components";

import { useAddItemMutation } from "../../cart";
import { useAddWishlistItemMutation } from "../../wishlist";

const ProductAction = ({ product, toast }) => {
  const [value, setValue] = useState(1);
  const [addCartItem] = useAddItemMutation();
  const [addWishlistItem] = useAddWishlistItemMutation();

  const addCartItemAction = async () => {
    try {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Item has been added.",
        life: 3000,
      });
      await addCartItem({ product, quantity: value }).unwrap();
    } catch {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Unable to add item.",
        life: 3000,
      });
    }
  };

  const addWishlistItemAction = async () => {
    try {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Item has been added.",
        life: 3000,
      });
      await addWishlistItem({ product }).unwrap();
    } catch {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Unable to add item.",
        life: 3000,
      });
    }
  };

  return (
    <div className="flex gap-2.5 flex-wrap">
      <NumberInput onChange={(val) => setValue(val)} />
      <Button
        icon={
          <div className="size-4 text-white">
            <Cart />
          </div>
        }
        label="Add to cart"
        severity="success"
        pt={{
          root: {
            className: "bg-[#3BB77E] rounded-[5px] px-5 gap-2.5",
          },
          label: {
            className: "font-quicksand font-bold text-white",
          },
        }}
        onClick={addCartItemAction}
      />
      <div className="flex gap-2.5">
        <Button
          icon={
            <div className="size-[18px] text-[#858585]">
              <Heart />
            </div>
          }
          severity="success"
          pt={{
            root: {
              className: "border border-[#F1F1F1] p-2.5",
            },
          }}
          onClick={addWishlistItemAction}
        />
        <Button
          icon={
            <div className="size-[18px] text-[#858585]">
              <ArrowCompare />
            </div>
          }
          severity="success"
          pt={{
            root: {
              className: "border border-[#F1F1F1] p-2.5",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProductAction;
