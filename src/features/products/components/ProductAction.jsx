import { useState } from "react";
import { NumberInput } from "../../../components";
import { Button } from "primereact/button";
import { ArrowCompare, Cart, Heart } from "../../../utils/icons.utils";

const ProductAction = () => {
  const [value, setValue] = useState(1);

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
