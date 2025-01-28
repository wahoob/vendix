import { classNames } from "primereact/utils";
import { useGetWishlistQuery } from "../wishlistsApiSlice";
import { AsyncContentWrapper } from "../../../components";
import WishlistItem from "./WishlistItem";
import { Button } from "primereact/button";

const WishlistList = ({ toast }) => {
  const { data, isLoading, isSuccess, isError, error, isFetching } =
    useGetWishlistQuery();

  return (
    <div className="space-y-8">
      <div className="space-y-2.5">
        <h1 className="text-4xl md:text-5xl font-bold text-[#243B4D]">
          Your Wishlist
        </h1>
        <p className="font-bold text-[#7E7E7E]">
          There are <span className="text-[#3BB77E]">{5}</span> products in this
          list
        </p>
      </div>

      <div className="font-quicksand font-bold text-[#243B4D]">
        <div
          className={classNames(
            "grid grid-cols-[1fr,repeat(2,55px)] md:grid-cols-[1fr,repeat(4,100px)] gap-2 xl:gap-4",
            "text-center bg-[#ECECEC] p-4 rounded-t-xl max-md:text-sm"
          )}
        >
          <span className="text-left">Product</span>
          <span>Price</span>
          <span className="max-md:hidden">Stock Status</span>
          <span className="max-md:hidden">Action</span>
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
            isSuccess={isSuccess}
            isError={isError}
            error={error}
            render={() =>
              data.products.length > 0 ? (
                data.products.map((product) => (
                  <WishlistItem
                    key={product._id}
                    product={product}
                    {...product}
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

export default WishlistList;
