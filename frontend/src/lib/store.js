import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import { profileApi } from "./features/profile/profileApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [profileApi.reducerPath]: profileApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(profileApi.middleware),
  });
};
