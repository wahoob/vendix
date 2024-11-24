import { Rating } from "primereact/rating";
import { classNames } from "primereact/utils";

import { Countdown } from "../../../components";

import { convertDateToSeconds } from "../../../utils/functions.utils";
import useCountdownTimer from "../hooks/useCountdownTimer";

const DealProduct = ({ images, brand, name, rating, price, discount }) => {
  const { formattedTime } = useCountdownTimer(
    convertDateToSeconds(discount.expiryDate)
  );

  return (
    <div
      className={classNames(
        "bg-white border border-[#EAEBED]",
        "rounded-lg shadow-shadow3",
        "px-10 py-8",
        "flex flex-col"
      )}
    >
      <div className="mx-auto w-fit">
        <img src={images[0]} alt={name} className="max-h-80 object-contain" />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <p className="text-xs font-medium text-[#55585B]">{brand}</p>
          <h4
            className={classNames(
              "font-medium text-[15px] text-[#010F1C] capitalize",
              "line-clamp-2"
            )}
          >
            {name}
          </h4>

          <div className="mt-2.5">
            <div className="row gap-1.5">
              <Rating
                value={rating.ratingsAverage}
                readOnly
                cancel={false}
                pt={{
                  root: { className: "gap-0.5" },
                  item: { className: "size-3" },
                  onIcon: { className: "text-[#FDC040]" },
                  offIcon: { className: "text-[#FDC040]" },
                }}
                title={rating.ratingsAverage}
              />

              <p className="text-xs font-medium text-[#55585B]">
                ({rating.ratingsQuantity} Review)
              </p>
            </div>
          </div>

          <div className="mt-2">
            <div className="row gap-1">
              <p className="text-[#55585B] font-medium text-xs line-through">
                ${price}
              </p>
              <p className="text-[15px] font-bold text-[#3BB77E]">
                ${(price - discount.amount).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Countdown formattedTime={formattedTime} />
        </div>
      </div>
    </div>
  );
};

export default DealProduct;
