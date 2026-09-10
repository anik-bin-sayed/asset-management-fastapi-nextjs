import { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import VideoModal from "../Home/VideoModal";

import { SiGoogledisplayandvideo360 } from "react-icons/si";
import { RiVideoUploadFill } from "react-icons/ri";

const FreeCourses = ({
  allFreeCourse,
  onPageChange,
  currentPage,
  isFetching,
}) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { isAuthenticated } = useSelector((state) => state?.auth);

  const { data, page, total_pages, has_next, has_previous } =
    allFreeCourse || {};

  if (!data || data.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600">No free courses available.</p>
      </div>
    );
  }

  const goToPage = (newPage) => {
    if (onPageChange && newPage >= 1 && newPage <= total_pages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className=" border max-w-6xl shadow p-10  rounded-md border-gray-200">
        {/* Header */}
        <div className="mb-10 w-full">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-center gap-4 px-4 sm:gap-6">
            {/* Icon */}
            <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-2xl bg-red-700 shadow-sm  sm:h-16 sm:w-16">
              <SiGoogledisplayandvideo360 className="h-7 w-7 text-white sm:h-8 sm:w-8" />
            </div>

            {/* Text */}
            <div className="min-w-0 text-left">
              <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-600 ring-1 ring-red-100 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                100% Free Learning
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Free Video Courses
              </h1>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
                Learn from industry experts and build your skills with{" "}
                <span className="font-semibold text-red-500">
                  completely free
                </span>{" "}
                video courses.
              </p>
            </div>
          </div>

          {/* Bottom line */}
          <div className="mx-auto mt-6 flex items-center justify-center gap-2">
            <span className="h-1 w-6 rounded-full bg-red-200" />
            <span className="h-1 w-12 rounded-full bg-red-400" />
            <span className="h-1 w-6 rounded-full bg-red-200" />
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {data.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded shadow-lg overflow-hidden transition-transform duration-300  flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative h-48 w-full bg-gray-200">
                <Image
                  src={course.thumbnail}
                  alt={course.title || course.description}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col grow">
                <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
                  {course.title || course.description}
                </h2>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2 grow">
                  {course.description || course.short_description}
                </p>

                {/* Meta: duration & language */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  {course.duration && (
                    <span className="flex items-center">
                      <span className="mr-1">⏱</span> {course.duration}
                    </span>
                  )}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {course.language || "English"}
                  </span>
                </div>

                {/* Watch button */}
                <div className="mt-5">
                  <button
                    onClick={() => {
                      if (!isAuthenticated) {
                        return;
                      }

                      setSelectedCourse(course);
                    }}
                    disabled={!isAuthenticated}
                    className={`w-full rounded-lg px-4 py-2.5 text-center font-medium transition-colors duration-200 flex items-center gap-2 justify-center ${
                      isAuthenticated
                        ? "cursor-pointer bg-yellow-400 text-black hover:bg-yellow-500"
                        : "cursor-not-allowed bg-gray-200 text-gray-500"
                    }`}
                  >
                    <RiVideoUploadFill />

                    {isAuthenticated ? "Watch Now" : "Login to Watch"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {total_pages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-2">
          {/* Previous */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={!has_previous || isFetching}
            className={`px-4 py-2 rounded-lg font-medium ${
              has_previous
                ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Previous
          </button>

          {/* Page numbers */}
          <div className="flex space-x-1">
            {Array.from({ length: total_pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                disabled={isFetching}
                className={`px-4 py-2 rounded-lg font-medium ${
                  p === currentPage
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={!has_next || isFetching}
            className={`px-4 py-2 rounded-lg font-medium ${
              has_next
                ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      )}
      {selectedCourse && (
        <VideoModal
          videoUrl={selectedCourse.video_url}
          title={selectedCourse.title}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default FreeCourses;
