import { apiSlice } from "../../app/api/apiSlice";

const wishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => "/wishlists",
      transformResponse: (response) => response.data.wishlist,
    }),

    addWishlistItem: builder.mutation({
      query: ({ product }) => ({
        url: "/wishlists/add",
        method: "PATCH",
        body: { product: product._id },
      }),

      onQueryStarted: async ({ product }, { dispatch, queryFulfilled }) => {
        const wishlistResult = dispatch(
          wishlistApiSlice.util.updateQueryData(
            "getWishlist",
            undefined,
            (draft) => {
              const productInWishlist = draft.products.some(
                (productItem) => productItem._id === product._id
              );

              if (!productInWishlist) {
                draft.products.push(product);
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          wishlistResult.undo();
        }
      },
    }),

    removeWishlistItem: builder.mutation({
      query: ({ productId }) => ({
        url: "/wishlists/remove",
        method: "PATCH",
        body: { product: productId },
      }),
      onQueryStarted: async ({ productId }, { dispatch, queryFulfilled }) => {
        const wishlistResult = dispatch(
          wishlistApiSlice.util.updateQueryData(
            "getWishlist",
            undefined,
            (draft) => {
              draft.products = draft.products.filter(
                (product) => product._id !== productId
              );
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          wishlistResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddWishlistItemMutation,
  useRemoveWishlistItemMutation,
} = wishlistApiSlice;
