import { Rating } from "primereact/rating";
import { twMerge } from "tailwind-merge";
import { getClassNames } from "../../utils/functions.utils";

const RatingStars = ({
  rating = {},
  value,
  viewQuantity = false,
  pt = {},
  readOnly = true,
  cancel = false,
  onChange,
}) => {
  const ratingsAverage = rating.ratingsAverage ?? 0;
  const ratingsQuantity = rating.ratingsQuantity ?? 0;

  const hasRating =
    rating.ratingsAverage !== undefined && rating.ratingsAverage !== null;

  const currentValue = value !== undefined ? value : ratingsAverage;

  return (
    <div className="flex items-center gap-2">
      <Rating
        value={currentValue}
        readOnly={readOnly}
        cancel={cancel}
        onChange={onChange}
        pt={{
          root: { className: twMerge("gap-0.5", getClassNames(pt, "root")) },
          item: {
            className: twMerge(
              "size-3 row justify-center",
              getClassNames(pt, "item"),
            ),
          },
          onIcon: {
            className: twMerge("text-[#FDC040]", getClassNames(pt, "onIcon")),
          },
          offIcon: {
            className: twMerge(
              "text-transparent",
              getClassNames(pt, "offIcon"),
            ),
          },
        }}
      />
      <p className="text-[#B6B6B6] text-sm">
        (
        {hasRating && value === undefined
          ? viewQuantity
            ? `${ratingsQuantity} reviews`
            : ratingsAverage.toFixed(1)
          : value !== undefined && value > 0
            ? `${value} Star${value > 1 ? "s" : ""}`
            : "No rating yet"}
        )
      </p>
    </div>
  );
};

export default RatingStars;
