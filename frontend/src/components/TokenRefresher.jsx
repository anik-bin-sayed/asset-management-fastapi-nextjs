"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRefreshAccessTokenMutation } from "@/lib/features/auth/authApi";
import { logout } from "@/lib/features/auth/authSlice";

const REFRESH_INTERVAL = 13 * 60 * 1000;

const TokenRefresher = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [refreshAccessToken] = useRefreshAccessTokenMutation();

  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(async () => {
      try {
        await refreshAccessToken().unwrap();
        console.log("Access token proactively refreshed");
      } catch (err) {
        console.log("Refresh failed, logging out");
        dispatch(logout());
      }
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [isAuthenticated, dispatch, refreshAccessToken]);

  return null;
};

export default TokenRefresher;
