import { apiSlice } from "../../app/api/apiSlice";

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: ({ sort, limit, page }) => {
        const params = new URLSearchParams();

        if (sort) params.append("sort", sort);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/reviews?${params.toString()}`,
          validateStatus: (response, result) =>
            response.status === 200 && !result.isError,
        };
      },

      transformResponse: (response) => ({
        result: response.result,
        total: response.total,
        reviews: response.data.reviews.map((review) => ({
          ...review,
          id: review._id,
        })),
      }),

      providesTags: (result) =>
        result?.reviews
          ? [
              ...result.reviews.map(({ id }) => ({ type: "Review", id })),
              { type: "Review", id: "LIST" },
            ]
          : [{ type: "Review", id: "LIST" }],
    }),

    getProductReviews: builder.query({
      query: ({ id, limit = 2 }) => {
        const params = new URLSearchParams();
        if (limit) params.append("limit", limit);

        return {
          url: `/products/${id}/reviews?${params.toString()}`,
          validateStatus: (response, result) =>
            response.status === 200 && !result.error,
        };
      },
      transformResponse: (response) => ({
        ...response,
        data: {
          reviews: response.data.reviews.map((review) => {
            review.id = review._id;
            return review;
          }),
        },
      }),

      providesTags: (_result, _error, { id }) => [
        { type: "Review", id: `PRODUCT_${id}` },
      ],

      keepUnusedDataFor: 300,
    }),

    deleteReview: builder.mutation({
      query: ({ id }) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
        validateStatus: (response, result) =>
          response.status === 204 && !result.isError,
      }),

      invalidatesTags: (_result, _error, { id }) => [{ type: "Review", id }],
    }),
  }),
});

export const {
  useLazyGetProductReviewsQuery,
  useGetAllReviewsQuery,
  useDeleteReviewMutation,
} = reviewsApiSlice;
