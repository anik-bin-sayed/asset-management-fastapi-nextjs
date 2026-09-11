"use client";

import CourseDetails from "../../../components/Upcoming/CourseDetails";

import { useParams } from "next/navigation";
import { useGetCourseByIdQuery } from "../../../lib/features/courses/paid-course-api";
import { Suspense } from "react";
import CourseDetailsSkeleton from "../../../components/Upcoming/CourseDetailsSkeleton";

const Page = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetCourseByIdQuery(id, {
    skip: !id,
  });

  if (isLoading) {
    return <CourseDetailsSkeleton />;
  }
  return (
    <Suspense fallback={<CourseDetailsSkeleton />}>
      <CourseDetails course={data} isLoading={isLoading} />
    </Suspense>
  );
};

export default Page;
