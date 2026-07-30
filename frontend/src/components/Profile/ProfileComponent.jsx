"use client";

import { useGetProfileQuery } from "@/lib/features/auth/authApi";
import React from "react";
import ProfileNavbar from "./ProfileNavbar";
import Loader from "@/utils/Loader";

const ProfileComponent = () => {
  const { data: profile, isLoading } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <Loader />;

  console.log("Profile data:", profile);

  return (
    <div>
      <ProfileNavbar profile={profile} />
    </div>
  );
};

export default ProfileComponent;
