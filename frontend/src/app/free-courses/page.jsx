import { Suspense } from "react";
import Loader from "../../utils/Loader";
import FreeCoursesContent from "../../components/FreeCourses/FreeCoursesContent";

const Page = async ({ searchParams }) => {
  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;

  return (
    <Suspense fallback={<Loader />}>
      <FreeCoursesContent currentPage={currentPage} />
    </Suspense>
  );
};

export default Page;
