import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseApi";

export const freeCourseApi = createApi({
  reducerPath: "freeCourseApi",

  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "Course"],
  endpoints: (builder) => ({
    getSomeFreeCourse: builder.query({
      query: () => ({
        url: `/free-courses`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    getAllFreeCourses: builder.query({
      query: ({ page = 1 } = {}) => ({
        url: `/free-courses/all?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
  }),
});

export const { useGetSomeFreeCourseQuery, useGetAllFreeCoursesQuery } =
  freeCourseApi;
