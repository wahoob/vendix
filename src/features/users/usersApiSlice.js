import { createSelector } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";
import { selectAddress, setAddress } from "./usersSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ sort, limit }) => {
        const params = new URLSearchParams();

        if (sort) params.append("sort", sort);
        if (limit) params.append("limit", limit);

        return {
          url: `/users?${params.toString()}`,
          validateStatus: (response, result) =>
            response.status === 200 && !result.isError,
        };
      },
      transformResponse: (response) => [
        ...response.data.users.map((user) => {
          user.id = user._id;
          return user;
        }),
      ],
    }),

    getMe: builder.query({
      query: "/users/me",
      transformResponse: (response) => response.data.user,

      // onQueryStarted: async (_args, { queryFulfilled, dispatch, getState }) => {
      //   const response = await queryFulfilled;
      //   console.log(response);

      //   // const selectedAddressId = getState().users.selectedAddressId;
      //   // const idExist = response.data.data.user.addresses.find(
      //   //   (addr) => addr._id === selectedAddressId
      //   // );

      //   // if (!idExist) {
      //   //   dispatch(
      //   //     setAddress({
      //   //       addressId: response.data.data.user.addresses?.[0]?._id,
      //   //     })
      //   //   );
      //   // }
      // },
    }),

    addAddress: builder.mutation({
      query: (address) => ({
        url: "/users/addAddress",
        method: "PATCH",
        body: {
          country: address.country,
          state: address.state,
          city: address.city,
          street: address.street,
        },
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          dispatch(
            usersApiSlice.util.updateQueryData("getMe", undefined, (draft) => {
              draft.addresses.push(response.data.data.address);
            })
          );
          dispatch(setAddress({ addressId: response.data.data.address._id }));
        } catch {
          // console.log("error" + err);
        }
      },
    }),

    updateAddress: builder.mutation({
      query: ({ addressId, updatedAddress }) => ({
        url: "/users/updateAddress",
        method: "PATCH",
        body: { addressId, updatedAddress },
      }),

      onQueryStarted: async (
        { addressId, updatedAddress },
        { dispatch, queryFulfilled }
      ) => {
        const userResult = dispatch(
          usersApiSlice.util.updateQueryData("getMe", undefined, (draft) => {
            const address = draft.addresses.find(
              (addr) => addr._id === addressId
            );
            Object.assign(address, updatedAddress);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          userResult.undo();
        }
      },
    }),

    removeAddress: builder.mutation({
      query: ({ addressId }) => ({
        url: "/users/removeAddress",
        method: "PATCH",
        body: { addressId },
      }),

      onQueryStarted: async (
        { addressId },
        { dispatch, queryFulfilled, getState }
      ) => {
        const userResult = dispatch(
          usersApiSlice.util.updateQueryData("getMe", undefined, (draft) => {
            draft.addresses = draft.addresses.filter(
              (addr) => addr._id !== addressId
            );
          })
        );

        try {
          if (getState().users.selectedAddressId === addressId) {
            const newId =
              userResult.patches[0].value[
                userResult.patches[0].value.length - 1
              ]?._id;

            dispatch(setAddress({ addressId: newId }));
          }
          await queryFulfilled;
        } catch {
          userResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useRemoveAddressMutation,
  useGetAllUsersQuery,
} = usersApiSlice;

export const selectUserResult = usersApiSlice.endpoints.getMe.select();

export const selectAddresses = createSelector(
  selectUserResult,
  (userResult) => userResult.data?.addresses ?? []
);

export const selectCurrentAddress = createSelector(
  [selectAddress, selectAddresses],
  (selectedAddressId, addresses) =>
    addresses.find((addr) => addr._id === selectedAddressId) ?? null
);
