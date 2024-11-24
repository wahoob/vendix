import { Rating } from "primereact/rating";

const ProductRating = ({ rating }) => (
  <div className="row gap-2">
    <Rating
      value={rating.ratingsAverage}
      readOnly
      cancel={false}
      pt={{
        root: { className: "gap-0.5" },
        item: { className: "size-3" },
        onIcon: { className: "text-[#FDC040]" },
        offIcon: { className: "text-transparent" },
      }}
    />
    <p className="text-[#B6B6B6] text-sm">
      ({rating.ratingsAverage.toFixed(1)})
    </p>
  </div>
);

export default ProductRating;
