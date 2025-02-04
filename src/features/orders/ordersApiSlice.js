import { apiSlice } from "../../app/api/apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ sort, limit }) => {
        const params = new URLSearchParams();

        if (sort) params.append("sort", sort);
        if (limit) params.append("limit", limit);

        return {
          url: `/orders/?${params.toString()}`,
          validateStatus: (response, result) =>
            response.status === 200 && !result.isError,
        };
      },
      transformResponse: (response) => [
        ...response.data.orders.map((order) => {
          order.id = order._id;
          return order;
        }),
      ],
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApiSlice;
