"use client";

import React, { useState } from "react";
import Image from "next/image";
import Loader from "@/utils/Loader";
import VideoModal from "./VideoModal";
import { useSelector } from "react-redux";
import Link from "next/link";

const FreeCourses = ({ data, loading }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const { isAuthenticated } = useSelector((state) => state?.auth);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="py-20 text-center text-gray-600">
        No free courses available at the moment.
      </div>
    );
  }

  return (
    <div className="px-4 py-12">
      {/* Header */}
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-gray-900">Free Video Courses</h1>

        <p className="mt-3 text-gray-600">
          Learn from industry experts – all content is completely free to watch.
        </p>
      </div>

      {/* Course Grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((course) => (
          <div
            key={course.id}
            className="flex flex-col overflow-hidden rounded bg-white shadow-lg transition-transform duration-300  border border-yellow-100"
          >
            {/* Image */}
            <div className="relative h-48 w-full">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            {/* Content */}
            <div className="flex grow flex-col p-5">
              <h2 className="line-clamp-2 text-xl font-bold text-gray-900">
                {course.title}
              </h2>

              <p className="mt-2 line-clamp-2 grow text-sm text-gray-600">
                {course.description || course.short_description}
              </p>

              {/* Meta */}
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="mr-1">⏱</span>
                  {course.duration}
                </span>

                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  {course.language}
                </span>
              </div>

              {/* Tags */}
              {course.tags && course.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

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

      {selectedCourse && (
        <VideoModal
          videoUrl={selectedCourse.video_url}
          title={selectedCourse.title}
          onClose={() => setSelectedCourse(null)}
        />
      )}
      <div className="text-center text-lg text-gray-900 mt-8">
        {data && data.length > 7 && (
          <Link
            href="/free-courses"
            className="py-2 px-4 rounded bg-yellow-400 text-black text-sm font-medium hover:bg-yellow-500 transition-colors duration-200"
          >
            View All Free Courses
          </Link>
        )}
      </div>
    </div>
  );
};

export default FreeCourses;
