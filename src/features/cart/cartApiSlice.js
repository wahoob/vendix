import { apiSlice } from "../../app/api/apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/carts",
      transformResponse: (response) => response.data.cart,
    }),

    addItem: builder.mutation({
      query: ({ product, quantity = 1 }) => ({
        url: "/carts/add",
        method: "PATCH",
        body: {
          product: product._id,
          quantity,
        },
      }),
      onQueryStarted: async (
        { product, quantity = 1 },
        { dispatch, queryFulfilled }
      ) => {
        const cartResult = dispatch(
          cartApiSlice.util.updateQueryData("getCart", undefined, (draft) => {
            const productInCart = draft.products.find(
              (item) => item.product._id === product._id
            );

            if (productInCart) {
              productInCart.quantity += quantity;
            } else {
              draft.products.push({
                product,
                quantity,
              });
            }

            draft.totalProducts = draft.products.length;
            draft.totalQuantity = draft.products.reduce(
              (acc, item) => acc + item.quantity,
              0
            );
            draft.total = draft.products
              .reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0
              )
              .toFixed(2);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          cartResult.undo();
        }
      },
    }),

    removeItem: builder.mutation({
      query: ({ productId }) => ({
        url: "/carts/remove",
        method: "PATCH",
        body: { product: productId },
      }),
      onQueryStarted: async ({ productId }, { dispatch, queryFulfilled }) => {
        const cartResult = dispatch(
          cartApiSlice.util.updateQueryData("getCart", undefined, (draft) => {
            draft.products = draft.products.filter(
              (item) => item.product._id !== productId
            );

            draft.totalProducts = draft.products.length;
            draft.totalQuantity = draft.products.reduce(
              (acc, item) => acc + item.quantity,
              0
            );
            draft.total = draft.products
              .reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0
              )
              .toFixed(2);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          cartResult.undo();
        }
      },
    }),

    updateQuantity: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: "/carts/updateQuantity",
        method: "PATCH",
        body: { product: productId, quantity },
      }),
      onQueryStarted: async (
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) => {
        let cartResult;

        try {
          await queryFulfilled;
          cartResult = dispatch(
            cartApiSlice.util.updateQueryData("getCart", undefined, (draft) => {
              const productInCart = draft.products.find(
                (item) => item.product._id === productId
              );

              if (productInCart) {
                productInCart.quantity = quantity;

                if (productInCart.quantity === 0) {
                  draft.products = draft.products.filter(
                    (item) => item.product._id !== productId
                  );
                }

                draft.totalProducts = draft.products.length;
                draft.totalQuantity = draft.products.reduce(
                  (acc, item) => acc + item.quantity,
                  0
                );
                draft.total = draft.products
                  .reduce(
                    (acc, item) => acc + item.product.price * item.quantity,
                    0
                  )
                  .toFixed(2);
              }
            })
          );
        } catch {
          cartResult.undo();
        }
      },
    }),

    clearCart: builder.mutation({
      query: () => ({
        url: "/carts/clear",
        method: "DELETE",
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        const cartResult = dispatch(
          cartApiSlice.util.updateQueryData("getCart", undefined, (draft) => {
            draft.products = [];
            draft.totalProducts = 0;
            draft.totalQuantity = 0;
            draft.total = 0;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          cartResult.undo();
        }
      },
    }),

    checkout: builder.mutation({
      query: ({ paymentStatus, shippingAddress }) => ({
        url: "/carts/checkout",
        method: "POST",
        body: { paymentStatus, shippingAddress },
      }),

      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(
          cartApiSlice.util.updateQueryData("getCart", undefined, (draft) => {
            draft.products = [];
            draft.totalProducts = 0;
            draft.totalQuantity = 0;
            draft.total = 0;
          })
        );
      },
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddItemMutation,
  useRemoveItemMutation,
  useUpdateQuantityMutation,
  useClearCartMutation,
  useCheckoutMutation,
} = cartApiSlice;
