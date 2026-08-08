"use client";

import ManageCourse from "@/components/ManageCourse";
import { useGetProfileQuery } from "@/lib/features/auth/authApi";
import { useGetAllFreeCoursesQuery } from "@/lib/features/courses/free-course-api";
import Loader from "@/utils/Loader";
import React, { Suspense } from "react";

const Page = () => {
  const { data, isLoading } = useGetProfileQuery();

  if (isLoading) return <Loader />;
  return (
    <Suspense fallback={<Loader />}>
      <ManageCourse profileData={data} />
    </Suspense>
  );
};

export default Page;
