import { useEffect, useMemo, useRef } from "react";

import { useGetProductsQuery } from "../productsApiSlice";

const useCustomGetProductsQuery = (args) => {
  if (args.limit === 10) delete args.limit;
  if (args.page === 1) delete args.page;
  if (args.price?.length === 0) delete args.price;

  const queryResult = useGetProductsQuery(args);

  const previousLimitValue = useRef(args.limit);

  useEffect(() => {
    if (previousLimitValue.current !== args.limit) {
      previousLimitValue.current = args.limit;
    }
  }, [args.limit]);

  const isLimitFetching = useMemo(
    () => previousLimitValue.current !== args.limit && queryResult.isFetching,
    [queryResult.isFetching, args.limit]
  );

  return {
    ...queryResult,
    isLimitFetching,
  };
};

export default useCustomGetProductsQuery;
