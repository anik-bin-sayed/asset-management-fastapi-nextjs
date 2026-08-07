"use client";

import FreeCourses from "@/components/FreeCourses";
import { useGetAllFreeCoursesQuery } from "@/lib/features/courses/free-course-api";
import Loader from "@/utils/Loader";
import { useSearchParams, useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL থেকে page নেওয়া
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data, isLoading, isFetching } = useGetAllFreeCoursesQuery({
    page: currentPage,
  });

  if (isLoading) {
    return <Loader />;
  }

  // Pagination change
  const handlePageChange = (newPage) => {
    router.push(`/free-courses?page=${newPage}`);
  };

  return (
    <FreeCourses
      allFreeCourse={data}
      onPageChange={handlePageChange}
      currentPage={currentPage}
      isFetching={isFetching}
    />
  );
};

export default Page;
