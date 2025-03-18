import { apiSlice } from "../../app/api/apiSlice";

export const vendorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // TODO: may need to create new one instead
    getVendors: builder.query({
      query: ({ fields, page, limit }) => {
        const params = new URLSearchParams();

        if (fields) params.append("fields", fields);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/vendors?${params.toString()}`,
          validateStatus: (response, result) =>
            response.status === 200 && !result.isError,
        };
      },
      transformResponse: (response) => ({
        result: response.result,
        total: response.total,
        vendors: response.data.vendors.map((vendor) => ({
          ...vendor,
          id: vendor._id,
        })),
      }),
      providesTags: (result) =>
        result?.vendors
          ? [
              ...result.vendors.map(({ id }) => ({ type: "Vendor", id })),
              { type: "Vendor", id: "LIST" },
            ]
          : [{ type: "Vendor", id: "LIST" }],
    }),

    getVendor: builder.query({
      query: ({ id }) => ({
        url: `/vendors/${id}`,
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      transformResponse: (response) => response.data.vendor,
    }),

    updateVendor: builder.mutation({
      query: ({ id }) => ({
        url: `/vendors/${id}`,
        method: "PATCH",
      }),

      invalidatesTags: (_result, _error, { id }) => [
        { type: "Vendor", id },
        { type: "Vendor", id: "LIST" },
      ],
    }),

    deleteVendor: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/vendors/${id}`,
        method: "DELETE",
        body: rest,
      }),

      invalidatesTags: (_result, _error, { id }) => [
        { type: "Vendor", id },
        { type: "Vendor", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetVendorsQuery,
  useGetVendorQuery,
  useDeleteVendorMutation,
  useUpdateVendorMutation,
} = vendorsApiSlice;
