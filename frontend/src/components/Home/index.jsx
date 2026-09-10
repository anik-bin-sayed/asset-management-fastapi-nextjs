import Hero from "./Hero";
import FreeCourses from "./FreeCourses";
import UpcomingCourse from "./UpcomingCourse";

const Home = ({ freeCourseData, freeCourseLoading, upcomingCourseData }) => {
  return (
    <>
      <Hero />
      <UpcomingCourse />
      <FreeCourses data={freeCourseData} loading={freeCourseLoading} />
    </>
  );
};

export default Home;
