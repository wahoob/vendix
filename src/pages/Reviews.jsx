import { ReviewsList } from "../features/reviews/components";

const Reviews = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold mb-1">Reviews list</h1>

      <div className="card">
        <ReviewsList />
      </div>
    </div>
  );
};

export default Reviews;
