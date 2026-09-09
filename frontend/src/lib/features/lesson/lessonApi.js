import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseApi";

export const lessonApi = createApi({
  reducerPath: "lessonApi",

  baseQuery: baseQueryWithReauth,
  tagTypes: ["Lesson", "Course"],
  endpoints: (builder) => ({
    createLesson: builder.mutation({
      query: (data) => ({
        url: `/lessons`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lesson", "Course"],
    }),

    getCourseLessons: builder.query({
      query: ({ id }) => ({
        url: `/lessons/course/${id}`,
        method: "GET",
      }),
      providesTags: ["Lesson"],
    }),

    deleteLesson: builder.mutation({
      query: ({ id }) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lesson", "Course"],
    }),

    getLessonById: builder.query({
      query: ({ id }) => ({
        url: `/lessons/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Lesson", "Course"],
    }),

    updateLesson: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/lessons/${id}`,
        method: "PUT",
        body: patch,
      }),
      providesTags: ["Lesson", "Course"],
    }),
  }),
});

export const {
  useCreateLessonMutation,
  useGetCourseLessonsQuery,
  useDeleteLessonMutation,
  useUpdateLessonMutation,
  useGetLessonByIdQuery,
} = lessonApi;
