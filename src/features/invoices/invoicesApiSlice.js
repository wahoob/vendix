import { apiSlice } from "../../app/api/apiSlice";

export const invoicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: ({ sort, limit, page }) => {
        const params = new URLSearchParams();

        if (sort) params.append("sort", sort);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/invoices/?${params.toString()}`,
          validateStatus: (response, result) =>
            response.status === 200 && !result.isError,
        };
      },
      transformResponse: (response) => ({
        result: response.result,
        total: response.total,
        invoices: response.data.invoices.map((invoice) => ({
          ...invoice,
          id: invoice._id,
        })),
      }),
    }),

    getInvoice: builder.query({
      query: ({ id }) => `/invoices/${id}`,
      transformResponse: (response) => response.data.invoice,
    }),
  }),
});

export const { useGetInvoicesQuery, useGetInvoiceQuery } = invoicesApiSlice;
