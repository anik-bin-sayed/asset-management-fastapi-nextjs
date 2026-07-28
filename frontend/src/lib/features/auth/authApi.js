import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseApi";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    checkEmail: builder.mutation({
      query: (data) => ({
        url: "/users/check-email",
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),

    getProfile: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    refreshAccessToken: builder.mutation({
      query: (data) => ({
        url: "/users/refresh",
        method: "POST",
        body: data,
      }),
    }),

    logoutUser: builder.mutation({
      query: (data) => ({
        url: "/users/logout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User", "Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useCheckEmailMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useLogoutUserMutation,
} = authApi;
