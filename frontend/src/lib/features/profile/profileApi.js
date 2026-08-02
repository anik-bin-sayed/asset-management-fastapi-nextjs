import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseApi";

export const profileApi = createApi({
  reducerPath: "profileApi",

  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User"],
  endpoints: (builder) => ({
    uploadAvatar: builder.mutation({
      query: (formData) => ({
        url: "/profile/avatar",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    updateProfileInfo: builder.mutation({
      query: ({ formData, user_id }) => ({
        url: `/profile/edit/${user_id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    userProfile: builder.query({
      query: ({ user_id }) => ({
        url: `/profile/${user_id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Only admin access

    allUsers: builder.query({
      query: ({ page = 1, limit = 30, search = "" }) => ({
        url: "/users",
        method: "GET",
        params: {
          page,
          limit,
          search,
        },
      }),

      providesTags: ["User"],
    }),
  }),
});

export const {
  useUploadAvatarMutation,
  useUpdateProfileInfoMutation,
  useAllUsersQuery,
  useUserProfileQuery,
} = profileApi;
