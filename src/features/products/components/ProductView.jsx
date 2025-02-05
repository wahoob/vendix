import { classNames } from "primereact/utils";
import { Button } from "primereact/button";

import { Cart } from "../../../utils/icons.utils";

import { Rating } from "../../../components";

import { useAddItemMutation } from "../../cart";

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
  product,
  toast,
}) => {
  const [addItem] = useAddItemMutation();

  const cartAction = async () => {
    try {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Item has been added.",
        life: 3000,
      });
      await addItem({ product }).unwrap();
    } catch {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Unable to add item.",
        life: 3000,
      });
    }
  };

  const CartIcon = (
    <div className="size-3.5">
      <Cart />
    </div>
  );

  const mainPrice = discount ? (price - discount.amount).toFixed(2) : price;

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
            <Rating rating={rating} />
          </div>

          <p className="text-sm text-[#B6B6B6] capitalize">
            By <span className="text-[#3BB77E]">{vendor.businessName}</span>
          </p>
        </div>

        <div className="row justify-between gap-3 mt-5">
          {/* product price */}
          <div className="row gap-x-2.5 gap-y-[5px] flex-wrap">
            <h4 className="text-lg font-bold text-[#3BB77E] font-quicksand">
              ${mainPrice}
            </h4>

            {discount && (
              <p className="font-quicksand text-sm font-bold text-[#ADADAD] line-through">
                ${price}
              </p>
            )}
          </div>

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
            onClick={cartAction}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductView;
