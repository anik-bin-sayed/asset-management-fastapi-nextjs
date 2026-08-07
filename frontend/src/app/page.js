"use client";

import { useGetSomeFreeCourseQuery } from "@/lib/features/courses/free-course-api";
import Home from "@/pages/Home";
import Loader from "@/utils/Loader";
import React from "react";

const Page = () => {
  const { data: someFreeCourseData, isLoading: freeCourseLoading } =
    useGetSomeFreeCourseQuery();

  if (freeCourseLoading) return <Loader />;

  return (
    <div>
      <Home
        freeCourseData={someFreeCourseData}
        freeCourseLoading={freeCourseLoading}
      />
    </div>
  );
};

export default Page;
