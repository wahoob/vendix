import { apiSlice } from "../../app/api/apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ sort, limit, page }) => {
        const params = new URLSearchParams();

        if (sort) params.append("sort", sort);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/categories?${params.toString()}`,
          validateStatus: (response, result) =>
            response.status === 200 && !result.isError,
        };
      },
      transformResponse: (response) => ({
        result: response.result,
        total: response.total,
        categories: [
          { id: "all", name: "all categories" },
          ...response.data.categories.map((category) => ({
            ...category,
            id: category._id,
          })),
        ],
      }),
      providesTags: (result) =>
        result?.categories
          ? [
              { type: "Category", id: "LIST" },
              ...result.categories.map((cat) => ({
                type: "Category",
                id: cat.id,
              })),
            ]
          : [{ type: "Category", id: "LIST" }],
    }),

    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/categories",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Category", id }],
    }),

    updateCategory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Category", id }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} = categoriesApiSlice;
