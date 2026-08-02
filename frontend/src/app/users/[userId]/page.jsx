"use client";

import UserProfile from "@/components/UserProfile/UserProfile";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { userId } = useParams();
  console.log("User ID from params:", userId);
  return <UserProfile userId={userId} />;
};

export default Page;
