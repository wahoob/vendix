import { apiSlice } from "../../app/api/apiSlice";

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useLazyGetProductReviewsQuery } = reviewsApiSlice;