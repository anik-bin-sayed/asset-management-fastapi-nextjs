import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseApi";

export const upcomingCourse = createApi({
  reducerPath: "upcomingCourse",

  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User"],
  endpoints: (builder) => ({
    getUpcomingCourse: builder.query({
      query: ({ page = 1, page_size = 8 } = {}) => ({
        url: `/upcoming-courses/upcoming?page=${page}&page_size=${page_size}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUpcomingCourseQuery } = upcomingCourse;
