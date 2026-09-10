import { Suspense } from "react";
import Loader from "../../utils/Loader";
import FreeCoursesContent from "../../components/FreeCourses/FreeCoursesContent";
import HeroSection from "../../components/FreeCourses/HeroSection";

const Page = async ({ searchParams }) => {
  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;

  return (
    <Suspense fallback={<Loader />}>
      <HeroSection />
      <FreeCoursesContent currentPage={currentPage} />
    </Suspense>
  );
};

export default Page;
