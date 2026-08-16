import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseApi";

export const paidCourseApi = createApi({
  reducerPath: "paidCourseApi",

  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "Course"],
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    getAllCourse: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `/courses?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
  }),
});

export const { useCreateCourseMutation, useGetAllCourseQuery } = paidCourseApi;
