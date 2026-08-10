import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import VideoModal from "../Home/VideoModal";

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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-medium text-gray-900 sm:text-5xl sm:tracking-tight lg:text-4xl">
          Free Video Courses
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Learn from industry experts – all content is completely free to watch.
        </p>
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
                  className={`w-full rounded-lg px-4 py-2.5 text-center font-medium transition-colors duration-200 ${
                    isAuthenticated
                      ? "cursor-pointer bg-yellow-400 text-black hover:bg-yellow-500"
                      : "cursor-not-allowed bg-gray-200 text-gray-500"
                  }`}
                >
                  {isAuthenticated ? "Watch Now" : "Login to Watch"}
                </button>
              </div>
            </div>
          </div>
        ))}
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
