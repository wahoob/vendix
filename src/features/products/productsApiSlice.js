import { apiSlice } from "../../app/api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        vendors,
        brands,
        limit,
        categories,
        price,
        sort,
        search,
        page,
      } = {}) => {
        const params = new URLSearchParams();

        if (vendors) params.append("vendor", vendors);
        if (brands) params.append("brand", brands);
        if (limit) params.append("limit", limit);
        if (categories && categories !== "all") {
          params.append("category", categories);
        }
        if (price) {
          params.append("price[gte]", price[0]);
          params.append("price[lte]", price[1]);
        }
        if (sort) params.append("sort", sort);
        if (search) params.append("search", search);
        if (page) params.append("page", page);

        return {
          url: `/products?${params.toString()}`,
          validateStatus: (response, result) =>
            response.status === 200 && !result.isError,
        };
      },
      transformResponse: (response) => ({
        result: response.result,
        total: response.total,
        products: response.data.products.map((product) => ({
          ...product,
          id: product._id,
        })),
      }),
      providesTags: (result) => {
        if (result?.products?.length) {
          return [
            { type: "Product", id: "LIST" },
            ...result.products.map((product) => ({
              type: "Product",
              id: product.id,
            })),
          ];
        } else return [{ type: "Product", id: "LIST" }];
      },
    }),

    getPopularProducts: builder.query({
      query: ({ category = "" }) => {
        const params = new URLSearchParams();
        params.append("sort", "-salesCount");
        if (category && category !== "all") params.append("category", category);

        return {
          url: `/products?${params.toString()}`,
          validateStatus: (response, result) =>
            response.status === 200 && !result.isError,
        };
      },
      transformResponse: (response) => response.data.products,
    }),

    searchProducts: builder.query({
      query: ({ searchTerm, selectedCategory = "" }) => {
        const params = new URLSearchParams();

        params.append("search", searchTerm);
        if (selectedCategory) params.append("category", selectedCategory);

        return {
          url: `/products?${params.toString()}`,
        };
      },
      transformResponse: (result) => result.data.products,
      keepUnusedDataFor: 60,
    }),

    getBrands: builder.query({
      query: () => ({
        url: "/products/brands",
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      transformResponse: (result) => result.data.brands,
    }),

    getPriceRage: builder.query({
      query: () => ({
        url: "/products/price-range",
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      transformResponse: (result) => result.data,
    }),

    getDeals: builder.query({
      query: () => ({
        url: "/products/deals",
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      transformResponse: (result) => result.data.deals,
    }),

    getProductBySlug: builder.query({
      query: ({ slug }) => ({
        url: `/products/slug/${slug}`,
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      transformResponse: (response) => response.data.product,
    }),

    getProductsOverview: builder.query({
      query: () => ({
        url: "/products/overview",
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      transformResponse: (response) => response.data,
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Product", id }],
    }),

    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Product", id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetPopularProductsQuery,
  useSearchProductsQuery,
  useGetBrandsQuery,
  useGetPriceRageQuery,
  useGetDealsQuery,
  useGetProductBySlugQuery,
  useGetProductsOverviewQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApiSlice;
