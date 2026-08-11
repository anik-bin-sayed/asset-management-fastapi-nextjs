import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
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

const mutex = new Mutex();

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    if (args?.url === "/auth/refresh") {
      api.dispatch(logout());
      return result;
    }

    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
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

          api.dispatch(setAccessToken(newAccessToken));

          result = await baseQuery(args, api, extraOptions);
        } else {
          console.log("Refresh token expired");
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
