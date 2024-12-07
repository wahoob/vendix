import { useState } from "react";
import ReviewCard from "./ReviewCard";
import { AsyncContentWrapper } from "../../../components";
import { RatingBarChart, VerticalDivider } from "../../../components";
import { Rating } from "primereact/rating";
import useProductReviews from "../hooks/useProductReviews";
import { classNames } from "primereact/utils";

const ProductReviews = ({ id, rating, reviews, salesCount }) => {
  const [showReviews, setShowReviews] = useState(false);

  const {
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    data,
    handleShowMore,
    isLimitExceeded,
  } = useProductReviews({ id });

  const handleClick = async () => {
    setShowReviews(true);
    await handleShowMore();
  };

  const showMore = (
    <div
      className="row gap-2 cursor-pointer text-[#3BB77E] hover:text-[#319969]"
      onClick={handleClick}
    >
      <p className="font-quicksand font-bold underline">
        {showReviews ? "Show more" : "Read all"} reviews
      </p>
      <i className="pi pi-angle-down animate-pulse" />
    </div>
  );

  let content;
  if (!reviews.length) {
    content = (
      <p className="text-center text-xl font-bold font-quicksand">
        Be the first to leave a review!
      </p>
    );
  } else if (showReviews) {
    content = (
      <AsyncContentWrapper
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        error={error}
        loadOnFetch={false}
        render={() => (
          <div className="space-y-6">
            {data.data.reviews.map((review) => {
              const { rating, comment, createdAt, updatedAt, user } = review;
              return (
                <ReviewCard
                  key={review.id}
                  fullName={user.fullName}
                  rating={rating}
                  comment={comment}
                  createdDate={createdAt}
                  updatedDate={updatedAt}
                />
              );
            })}
            {data.result !== data.total && !isLimitExceeded && showMore}
            {isLimitExceeded && (
              <i
                className={classNames(
                  "pi pi-spin pi-spinner-dotted",
                  "text-3xl text-center w-full"
                )}
              ></i>
            )}
          </div>
        )}
      />
    );
  } else {
    content = showMore;
  }

  return (
    <div className="space-y-8">
      <div className="flex max-sm:flex-col items-start sm:items-center gap-y-4 gap-x-14">
        <div className="row sm:flex-col gap-2">
          <h3 className="text-5xl font-bold">{rating.ratingsAverage}</h3>

          <div className="space-y-0.5 sm:text-center">
            <Rating
              value={rating.ratingsAverage}
              readOnly
              cancel={false}
              pt={{
                root: { className: "gap-0.5" },
                item: { className: "size-5" },
                onIcon: { className: "text-[#3BB77E]" },
                offIcon: { className: "text-[#3BB77E]" },
              }}
            />
            <p className="font-quicksand font-semibold text-[#7E7E7E]">
              {salesCount} sales
            </p>
          </div>
        </div>

        <div className="h-32 max-sm:hidden">
          <VerticalDivider fullHeight />
        </div>

        <div className="flex-1 w-full">
          <RatingBarChart reviews={reviews} />
        </div>
      </div>

      {content}
    </div>
  );
};

export default ProductReviews;
