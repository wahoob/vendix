import { useState } from "react";
import { Button } from "primereact/button";
import { Rating } from "../../../components";
import { classNames } from "primereact/utils";
import useAuth from "../../auth/hooks/useAuth";
import { useCanReviewQuery, useAddReviewMutation } from "../reviewsApiSlice";

const AddReviewForm = ({ productId }) => {
  const { isLoggedIn } = useAuth();
  const { data, isLoading, isError } = useCanReviewQuery(productId, {
    skip: !isLoggedIn,
  });
  const [
    addReview,
    { isLoading: isPosting, isSuccess, isError: isPostError, error: postError },
  ] = useAddReviewMutation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    try {
      await addReview({ rating, comment, product: productId }).unwrap();
      setRating(0);
      setComment("");
    } catch {
      // error handled by isPostError/postError
    }
  };

  const notLoggedIn = !isLoggedIn;
  const checkingEligibility = isLoading;
  const notEligible = isError || (data && data.canReview === false);
  const isDisabled =
    notLoggedIn || checkingEligibility || notEligible || isPosting;

  return (
    <div
      className={classNames("mt-4 sm:mt-6", {
        "opacity-60 pointer-events-none": isDisabled,
      })}
    >
      {isSuccess && (
        <div className="mb-4 text-center text-green-600 font-semibold">
          Review submitted successfully!
        </div>
      )}
      {isPostError && (
        <div className="mb-4 text-center text-rose-500 font-semibold">
          {postError?.data?.message ||
            "Failed to submit review. Please try again."}
        </div>
      )}
      <div
        className={classNames(
          "flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6",
          { relative: checkingEligibility },
        )}
      >
        {checkingEligibility && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
            <i className="pi pi-spin pi-spinner text-2xl text-[#3BB77E]" />
          </div>
        )}

        <div
          className={classNames(
            "flex justify-center items-center shrink-0 sm:mt-1",
            "bg-[#3BB77E] text-white size-10 sm:size-12 rounded-full",
            { "bg-gray-400": isDisabled },
          )}
        >
          <i className="pi pi-pencil text-lg sm:text-xl" />
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
            {notLoggedIn
              ? "Login to Share Your Experience"
              : notEligible
                ? "Review Submission Closed"
                : "Share Your Experience"}
          </h3>

          <p className="text-sm sm:text-base text-gray-500 mt-1">
            {notLoggedIn
              ? "Please sign in to leave your feedback"
              : notEligible
                ? "You've already reviewed this product or aren't eligible"
                : "Your review helps others make better choices"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-medium text-gray-700">
            How would you rate this product?
          </label>

          <div className="flex items-center gap-3 sm:gap-4">
            <Rating
              value={rating}
              onChange={(e) => setRating(e.value)}
              readOnly={isDisabled}
              cancel={false}
              pt={{
                root: "sm:gap-0",
                item: "size-4 sm:size-6",
                onIcon: classNames("text-[#FDC040]", {
                  "text-gray-300": isDisabled,
                }),
                offIcon: "text-gray-300",
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-medium text-gray-700">
            Tell us more about your experience
          </label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            maxLength={200}
            className={classNames(
              "w-full min-w-0 border border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3",
              "text-sm sm:text-base focus:border-[#3BB77E] focus:ring-2 focus:ring-[#3BB77E]/30",
              "transition-all resize-none focus:outline-none",
              { "bg-gray-50": isDisabled },
            )}
            placeholder={
              notLoggedIn
                ? "Sign in to leave your review"
                : notEligible
                  ? "Review submission not available"
                  : "What did you like or dislike? Would you recommend this product?"
            }
            disabled={isDisabled}
          />

          {!isDisabled && (
            <div className="flex justify-between items-center">
              <p
                className={classNames("text-xs sm:text-sm", {
                  "text-rose-500": comment.length < 25,
                  "text-gray-500": comment.length >= 25,
                })}
              >
                {comment.length < 25
                  ? `${25 - comment.length} more characters required`
                  : "Looks good!"}
              </p>
              <span className="text-xs text-gray-400">
                {comment.length}/200
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            className={classNames(
              "px-4 sm:px-6 py-2 sm:py-2.5 border border-gray-300 rounded-lg",
              "hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center",
            )}
            disabled={isPosting || isDisabled}
            icon="pi pi-times"
          />
          <Button
            type="submit"
            label={
              notLoggedIn
                ? "Sign In to Review"
                : notEligible
                  ? "Review Not Available"
                  : isPosting
                    ? "Posting..."
                    : "Submit Review"
            }
            className={classNames(
              "px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-colors",
              "w-full sm:w-auto justify-center",
              notEligible
                ? "bg-gray-400 hover:bg-gray-500 text-white"
                : "bg-[#3BB77E] hover:bg-[#2d9e6d] text-white",
            )}
            disabled={
              isPosting || isDisabled || rating === 0 || comment.length < 25
            }
            icon={
              isPosting
                ? "pi pi-spinner pi-spin"
                : notLoggedIn
                  ? "pi pi-sign-in"
                  : notEligible
                    ? "pi pi-lock"
                    : "pi pi-send"
            }
            iconPos="right"
          />
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
