import { apiSlice } from "../../app/api/apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ sort, limit, page }) => {
        const params = new URLSearchParams();

        if (sort) params.append("sort", sort);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/orders/?${params.toString()}`,
          validateStatus: (response, result) =>
            response.status === 200 && !result.isError,
        };
      },
      transformResponse: (response) => ({
        result: response.result,
        total: response.total,
        orders: response.data.orders.map((order) => ({
          ...order,
          id: order._id,
        })),
      }),
    }),

    getOrder: builder.query({
      query: ({ id }) => `/orders/${id}`,
      transformResponse: (response) => response.data.order,
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderQuery } = ordersApiSlice;
