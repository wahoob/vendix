import { createSelector } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";
import { selectAddress, setAddress } from "./usersSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ sort, limit, page }) => {
        const params = new URLSearchParams();

        if (sort) params.append("sort", sort);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/users?${params.toString()}`,
          validateStatus: (response, result) =>
            response.status === 200 && !result.isError,
        };
      },

      transformResponse: (response) => ({
        result: response.result,
        total: response.total,
        users: response.data.users.map((user) => ({
          ...user,
          id: user._id,
        })),
      }),

      providesTags: (result) =>
        result?.users
          ? [
              ...result.users.map(({ id }) => ({ type: "User", id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    updateUser: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: rest,
      }),

      invalidatesTags: (_result, _error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (_result, _error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    getMe: builder.query({
      query: () => "/users/me",
      transformResponse: (response) => response.data.user,

      onQueryStarted: async (_args, { queryFulfilled, dispatch, getState }) => {
        const response = await queryFulfilled;

        const selectedAddressId = getState().users.selectedAddressId;
        const idExist = response.data.addresses.find(
          (addr) => addr._id === selectedAddressId
        );

        if (!idExist) {
          dispatch(
            setAddress({
              addressId: response.data.addresses?.[0]?._id,
            })
          );
        }
      },
    }),

    updateMe: builder.mutation({
      query: (data) => ({
        url: "/users/me",
        method: "PATCH",
        body: data,
      }),

      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const usersResult = dispatch(
          usersApiSlice.util.updateQueryData("getMe", undefined, (draft) => {
            Object.keys(args).forEach((key) => {
              if (key in draft) {
                draft[key] = args[key];
              }
            });
          })
        );

        try {
          await queryFulfilled;
        } catch {
          usersResult.undo();
        }
      },
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
  useUpdateMeMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
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
