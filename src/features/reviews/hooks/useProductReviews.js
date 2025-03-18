import { useMemo, useState } from "react";

import { useLazyGetProductReviewsQuery } from "../reviewsApiSlice";

const useProductReviews = ({ id, defaultLimit = 2 }) => {
  const [limit, setLimit] = useState(defaultLimit);

  const [trigger, queryResult] = useLazyGetProductReviewsQuery({
    keepUnusedDataFor: 300,
  });

  const isLimitExceeded = useMemo(() => {
    return limit > defaultLimit && queryResult.isFetching;
  }, [defaultLimit, limit, queryResult.isFetching]);

  const handleShowMore = async () => {
    await trigger({ id, limit });
    setLimit((prev) => prev + defaultLimit);
  };

  return {
    ...queryResult,
    isLimitExceeded,
    handleShowMore,
  };
};

export default useProductReviews;
