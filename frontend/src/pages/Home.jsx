import FreeCourses from "../components/Home/FreeCourses";
import Hero from "../components/Home/Hero";
import React from "react";

const Home = ({ freeCourseData, freeCourseLoading }) => {
  return (
    <>
      <Hero />
      <FreeCourses data={freeCourseData} loading={freeCourseLoading} />
      {/* <UpcommingCourse /> */}
    </>
  );
};

export default Home;
