import { classNames } from "primereact/utils";
import { Button } from "primereact/button";

import ProductRating from "./ProductRating";
import ProductPrice from "./ProductPrice";

import { Cart } from "../../../utils/icons.utils";

const ProductView = ({
  images,
  slug,
  brand,
  name,
  rating,
  vendor,
  price,
  discount,
  description,
  createdAt,
  gridView,
  id,
}) => {
  const CartIcon = (
    <div className="size-3.5">
      <Cart />
    </div>
  );

  return (
    <div
      className={classNames(
        "border border-[#ECECEC]",
        "rounded-[15px] p-[21px]",
        "flex flex-col"
      )}
    >
      <div className="w-fit mx-auto">
        <img
          src={images[0]}
          alt={name}
          className="h-[11.3rem] object-contain"
        />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div>
          <p className="text-xs text-[#ADADAD]">{brand}</p>
          <h4 className="font-quicksand font-bold text-[#253D4E] my-1 line-clamp-2">
            {name}
          </h4>

          <div className="mb-1">
            <ProductRating rating={rating} />
          </div>

          <p className="text-sm text-[#B6B6B6] capitalize">
            By <span className="text-[#3BB77E]">{vendor.businessName}</span>
          </p>
        </div>

        <div className="row justify-between gap-3 mt-5">
          <ProductPrice discount={discount} price={price} />

          <Button
            severity="success"
            label="Add"
            icon={CartIcon}
            pt={{
              root: {
                className: "gap-[5px] px-5 py-2.5 bg-[#DEF9EC] text-[#3BB77E]",
              },
              label: { className: "text-sm" },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductView;