import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setAccessToken } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Access token expired
  if (result?.error?.status === 401) {
    console.log("Access token expired. Refreshing...");

    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
      },
      api,
      extraOptions,
    );

    if (refreshResult?.data?.access_token) {
      const newAccessToken = refreshResult.data.access_token;

      console.log("New access token received");

      // Save new token to Redux
      api.dispatch(setAccessToken(newAccessToken));

      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("Refresh token expired");

      api.dispatch(logout());
    }
  }

  return result;
};
