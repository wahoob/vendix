import { apiSlice } from "../../app/api/apiSlice";
import { logout, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: "/users/login",
        method: "POST",
        body: { email, password },
      }),

      onQueryStarted: async (
        { isLoginAttempt },
        { queryFulfilled, dispatch }
      ) => {
        try {
          const response = await queryFulfilled;
          if (isLoginAttempt) {
            setTimeout(() => {
              dispatch(setCredentials(response.data));
            }, 3000);
          } else {
            dispatch(setCredentials(response.data));
          }
        } catch (err) {
          console.error("Error details:", err.message || err.data || err);
        }
      },
    }),

    sendLogout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),

      onQueryStarted: async (_args, { queryFulfilled, dispatch }) => {
        try {
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState()); //it may needs a timeout
          await queryFulfilled;
        } catch (err) {
          console.error("Error details:", err.message || err.data || err);
        }
      },
    }),

    refetch: builder.mutation({
      query: () => ({
        url: "/users/refresh",
        method: "GET",
      }),

      onQueryStarted: async (args, { queryFulfilled, dispatch }) => {
        try {
          const response = await queryFulfilled;
          dispatch(setCredentials(response.data));
        } catch (err) {
          console.error("Error details:", err.message || err.data || err);
        }
      },
    }),

    signup: builder.mutation({
      query: ({ username, email, fullName, password, passwordConfirm }) => ({
        url: "/users/signup",
        method: "POST",
        body: { username, email, fullName, password, passwordConfirm },
      }),
    }),

    resendVerify: builder.mutation({
      query: ({ email }) => ({
        url: "/users/resendVerify",
        method: "POST",
        body: { email },
      }),
    }),

    verifyEmail: builder.mutation({
      query: ({ code }) => ({
        url: `/users/verify/${code}`,
        method: "POST",
      }),

      onQueryStarted: async (args, { queryFulfilled, dispatch }) => {
        try {
          const response = await queryFulfilled;
          dispatch(setCredentials(response.data));
        } catch (err) {
          console.error("Error details:", err.message || err.data || err);
        }
      },
    }),

    changePassword: builder.mutation({
      query: ({ currentPassword, password, passwordConfirm }) => ({
        url: `/users/updatePassword`,
        method: "PATCH",
        body: {
          currentPassword,
          password,
          passwordConfirm,
        },
      }),

      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          dispatch(setCredentials(response.data));
        } catch (err) {
          console.error("Error details:", err.message || err.data || err);
        }
      },
    }),

    updateEmail: builder.mutation({
      query: ({ email }) => ({
        url: "/users/updateEmail",
        method: "PATCH",
        body: { email },
      }),
    }),
  }),
});

export const {
  useSendLoginMutation,
  useSendLogoutMutation,
  useRefetchMutation,
  useSignupMutation,
  useResendVerifyMutation,
  useVerifyEmailMutation,
  useChangePasswordMutation,
  useUpdateEmailMutation,
} = authApiSlice;
