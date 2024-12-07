import { classNames } from "primereact/utils";
import ProductRating from "./ProductRating";
import useDiscount from "../hooks/useDiscount";
import ProductAction from "./ProductAction";

const ProductInfo = ({
  discount,
  rating,
  price,
  description,
  brand,
  createdAt,
  shippingInformation,
  stockQuantity,
  warrantyInformation,
  tags,
  name,
}) => {
  const { isOnSale, newPrice, percentageOff } = useDiscount(price, discount);
  const details = [
    { label: "Brand", value: brand, colSpan: 1 },
    { label: "Tags", value: tags.join(", "), colSpan: 1 },
    {
      label: "SSD",
      value: new Date(createdAt).toLocaleDateString("en-Us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      colSpan: 1,
    },
    { label: "Stock", value: `${stockQuantity} Items In Stock`, colSpan: 1 },
    { label: "Shipping Information", value: shippingInformation, colSpan: 2 },
    { label: "Warranty Information", value: warrantyInformation, colSpan: 2 },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-start gap-5 flex-1 xl:max-h-[26rem]">
        <div className="flex flex-col items-start gap-2">
          {isOnSale && (
            <div
              className={classNames(
                "bg-[#FDE0E9] text-[#F74B81]",
                "font-quicksand font-bold text-sm",
                "px-3 py-1.5 rounded-[5px]"
              )}
            >
              Sale Off
            </div>
          )}

          <h1 className="font-quicksand font-bold text-4xl sm:text-5xl text-[#253D4E] capitalize">
            {name}
          </h1>

          <ProductRating rating={rating} viewQuantity />
        </div>

        <div className="row gap-3 font-quicksand">
          <h1 className="font-bold text-5xl sm:text-6xl text-[#3BB77E]">
            ${newPrice}
          </h1>
          {discount && (
            <div className="row flex-col">
              <p className="text-[#FDC040] font-semibold text-xs">
                {percentageOff}% Off
              </p>
              <p className="font-bold text-3xl text-[#B6B6B6] line-through">
                ${price}
              </p>
            </div>
          )}
        </div>

        <p className="text-[17px] text-[#7E7E7E] leading-6">{description}</p>

        <ProductAction />
      </div>

      <div className="grid grid-cols-2 gap-y-1">
        {details.map(({ label, value, colSpan }, index) => (
          <p
            key={index}
            className={classNames("text-[13px] text-[#7E7E7E]", {
              "col-span-2": colSpan === 2,
            })}
          >
            {label}: <span className="text-[#3BB77E] capitalize">{value}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;
