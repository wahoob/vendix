import { apiSlice } from "../../app/api/apiSlice";

export const vendorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVendors: builder.query({
      query: ({ fields }) => {
        const params = new URLSearchParams();

        if (fields) params.append("fields", fields);

        return {
          url: `/vendors?${params.toString()}`,
          validateStatus: (response, result) =>
            response.status === 200 && !result.isError,
        };
      },
      transformResponse: (result) => {
        const loadedVendors = result.data.vendors.map((vendor) => {
          vendor.id = vendor._id;
          return vendor;
        });

        return loadedVendors;
      },
      providesTags: (result) => {
        if (result?.length) {
          return [
            { type: "Vendor", id: "LIST" },
            ...result.map((id) => ({ type: "Vendor", id })),
          ];
        } else {
          return [{ type: "Vendor", id: "LIST" }];
        }
      },
    }),
  }),
});

export const { useGetVendorsQuery } = vendorsApiSlice;
