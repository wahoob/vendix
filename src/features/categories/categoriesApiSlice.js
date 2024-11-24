import { apiSlice } from "../../app/api/apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/categories",
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      transformResponse: (response) => {
        const loadedCategories = [
          { id: "all", name: "all categories" },
          ...response.data.categories.map((category) => {
            category.id = category._id;
            return category;
          }),
        ];
        return loadedCategories;
      },
      providesTags: (result) => {
        if (result?.length) {
          return [
            { type: "Category", id: "LIST" },
            ...result.map((id) => ({ type: "Category", id })),
          ];
        } else {
          return [{ type: "Category", id: "LIST" }];
        }
      },
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApiSlice;
