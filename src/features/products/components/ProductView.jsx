import { classNames } from "primereact/utils";
import { Button } from "primereact/button";

import { Cart } from "../../../utils/icons.utils";

import { Rating } from "../../../components";

import { useAddItemMutation } from "../../cart";
import { twMerge } from "tailwind-merge";
import { getClassNames } from "../../../utils/functions.utils";
import { useNavigate } from "react-router-dom";

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
  pt,
  toast,
}) => {
  const [addItem] = useAddItemMutation();
  const navigate = useNavigate();

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
        "border border-[#ECECEC] group",
        "rounded-[15px] p-[21px]",
        "flex flex-col cursor-pointer",
      )}
      onClick={() => navigate(`/shop/${slug}`)}
    >
      <div
        className={twMerge(
          "w-fit mx-auto h-[11.3rem]",
          getClassNames(pt, "image"),
        )}
      >
        <img
          src={images[0]}
          alt={name}
          className="size-full object-contain group-hover:scale-125 transition-all duration-300"
        />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div>
          <p
            className={twMerge(
              "text-xs text-[#ADADAD]",
              getClassNames(pt, "brand"),
            )}
          >
            {brand}
          </p>
          <h4
            className={twMerge(
              "font-quicksand font-bold text-[#253D4E] my-1 line-clamp-2",
              getClassNames(pt, "name"),
            )}
          >
            {name}
          </h4>

          <div className={classNames("mb-1", getClassNames(pt, "rating"))}>
            <Rating rating={rating} />
          </div>

          <p
            className={twMerge(
              "text-sm text-[#B6B6B6] capitalize",
              getClassNames(pt, "businessName"),
            )}
          >
            By <span className="text-[#3BB77E]">{vendor.businessName}</span>
          </p>
        </div>

        <div
          className={twMerge(
            "row justify-between gap-3 mt-5",
            getClassNames(pt, "footer"),
          )}
        >
          {/* product price */}
          <div className="row gap-x-2.5 gap-y-[5px] flex-wrap">
            <h4
              className={twMerge(
                "text-lg font-bold text-[#3BB77E] font-quicksand",
                getClassNames(pt, "price"),
              )}
            >
              ${mainPrice}
            </h4>

            {discount && (
              <p
                className={twMerge(
                  "font-quicksand text-sm font-bold text-[#ADADAD] line-through",
                  getClassNames(pt, "discount"),
                )}
              >
                ${price}
              </p>
            )}
          </div>

          <Button
            severity="success"
            label="Add"
            icon={CartIcon}
            pt={{
              root: twMerge(
                "gap-[5px] px-5 py-2.5 bg-[#DEF9EC] text-[#3BB77E]",
                getClassNames(pt, "buttonRoot"),
              ),
              label: twMerge("text-sm", getClassNames(pt, "buttonLabel")),
            }}
            onClick={cartAction}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductView;
