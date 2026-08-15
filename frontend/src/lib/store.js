import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import { profileApi } from "./features/profile/profileApi";
import { freeCourseApi } from "./features/courses/free-course-api";
import authReducer from "./features/auth/authSlice";
import { categoryApi } from "./features/category/category-api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
      [profileApi.reducerPath]: profileApi.reducer,
      [freeCourseApi.reducerPath]: freeCourseApi.reducer,
      [categoryApi.reducerPath]: categoryApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(profileApi.middleware)
        .concat(freeCourseApi.middleware)
        .concat(categoryApi.middleware),
  });
};
