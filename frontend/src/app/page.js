"use client";

import Home from "../components/Home";

import { useGetSomeFreeCourseQuery } from "../lib/features/courses/free-course-api";

const Page = () => {
  const { data: someFreeCourseData, isLoading: freeCourseLoading } =
    useGetSomeFreeCourseQuery();

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
