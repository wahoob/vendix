import { Rating } from "primereact/rating";
import { twMerge } from "tailwind-merge";
import { getClassNames } from "../../utils/functions.utils";

const RatingStars = ({ rating, viewQuantity, pt }) => (
  <div className="row gap-2">
    <Rating
      value={rating.ratingsAverage}
      readOnly
      cancel={false}
      pt={{
        root: { className: twMerge("gap-0.5", getClassNames(pt, "root")) },
        item: { className: twMerge("size-3", getClassNames(pt, "item")) },
        onIcon: {
          className: twMerge("text-[#FDC040]", getClassNames(pt, "onIcon")),
        },
        offIcon: {
          className: twMerge("text-transparent", getClassNames(pt, "offIcon")),
        },
      }}
    />
    <p className="text-[#B6B6B6] text-sm">
      (
      {viewQuantity
        ? `${rating.ratingsQuantity} reviews`
        : rating.ratingsAverage.toFixed(1)}
      )
    </p>
  </div>
);

export default RatingStars;
