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

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),

    getCourseBySlug: builder.query({
      query: (slug) => ({
        url: `/courses/${slug}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/courses/${id}/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCourseQuery,
  useDeleteCourseMutation,
  useGetCourseBySlugQuery,

  useUpdateCourseMutation,
} = paidCourseApi;
