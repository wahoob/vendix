import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";
import { Rating } from "../../../components";
import { Button } from "primereact/button";
import { useAddItemMutation } from "../../cart/cartApiSlice";
import { useRemoveWishlistItemMutation } from "../../wishlist/wishlistsApiSlice";

const WishlistItem = ({
  images,
  rating,
  name,
  price,
  stockQuantity,
  _id,
  product,
  toast,
}) => {
  const navigate = useNavigate();
  const [removeWishlistItem] = useRemoveWishlistItemMutation();
  const [addCartItem] = useAddItemMutation();

  const removeWishlistItemAction = async () => {
    try {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Item has been removed from wishlist.",
        life: 3000,
      });
      await removeWishlistItem({ productId: _id }).unwrap();
    } catch {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Unable to remove item from wishlist.",
        life: 3000,
      });
    }
  };
  const addCartItemAction = async () => {
    try {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Item has been added to cart.",
        life: 3000,
      });
      await addCartItem({ product }).unwrap();
    } catch {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Unable to add item from cart.",
        life: 3000,
      });
    }
  };

  const inStock = stockQuantity > 0;

  return (
    <div
      className={classNames(
        "grid grid-cols-[1fr,repeat(2,55px)] md:grid-cols-[1fr,repeat(4,100px)] gap-2 xl:gap-4 items-center",
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
              "max-sm:text-sm xl:text-lg text-[#3bb77e]",
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

      <p className="text-lg xl:text-2xl text-[#3BB77E]">${price}</p>

      <div
        className={classNames(
          "text-xs",
          "rounded-md py-2 px-4 w-fit mx-auto max-md:hidden",
          {
            "text-[#3bb77e] bg-[#DEF9EC]": inStock,
            "text-[#F74B81] bg-[#FDE0E9]": !inStock,
          }
        )}
      >
        {inStock ? "In Stock" : "Out Stock"}
      </div>

      <Button
        className="max-md:hidden"
        label={inStock ? "Add to cart" : "Contact Us"}
        pt={{
          root: classNames("rounded-md py-2", {
            "bg-[#3BB77E]": inStock,
            "bg-[#3E5379]": !inStock,
          }),
          label: "text-white text-sm font-normal",
        }}
        onClick={addCartItemAction}
      />

      <Button
        icon="pi pi-trash"
        pt={{
          root: "w-fit mx-auto",
          icon: "text-[#7E7E7E]",
        }}
        severity="success"
        onClick={removeWishlistItemAction}
      />
    </div>
  );
};

export default WishlistItem;
