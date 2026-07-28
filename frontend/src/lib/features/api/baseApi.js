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

    headers.set("Content-Type", "application/json");

    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("Access token expired. Refreshing...");

    const refreshResult = await baseQuery(
      {
        url: "/users/refresh",
        method: "POST",
      },
      api,
      extraOptions,
    );

    if (refreshResult?.data?.access_token) {
      const newAccessToken = refreshResult.data.access_token;

      api.dispatch(setAccessToken(newAccessToken));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
