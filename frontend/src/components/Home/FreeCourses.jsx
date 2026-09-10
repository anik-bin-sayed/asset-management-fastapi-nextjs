"use client";

import React, { useState } from "react";
import Image from "next/image";
import Loader from "../../utils/Loader";
import VideoModal from "./VideoModal";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { SiGoogledisplayandvideo360 } from "react-icons/si";

const FreeCourses = ({ data, loading }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const { isAuthenticated } = useSelector((state) => state?.auth);

  if (!data || data.length === 0) {
    return (
      <div className="py-20 text-center text-gray-600">
        No free courses available at the moment.
      </div>
    );
  }

  if (loading) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading Skeleton */}
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="mx-auto mb-3 h-8 w-64 animate-pulse rounded bg-gray-200" />
            <div className="mx-auto h-4 w-96 max-w-full animate-pulse rounded bg-gray-200" />
          </div>

          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >
                <div className="h-48 animate-pulse bg-gray-200" />

                <div className="space-y-3 p-5">
                  <div className="h-5 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="px-4 py-12 flex items-center justify-center">
      <div className="max-w-7xl border p-10 rounded-xl border-gray-100 shadow bg-gray-800">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          {" "}
          <div className="flex items-center justify-center gap-6">
            {/* Icon */}{" "}
            <div className=" flex h-14 w-20 items-center justify-center rounded-xl bg-yellow-50 shadow-sm ring-1 ring-yellow-400">
              {" "}
              <SiGoogledisplayandvideo360 className="h-7 w-7 text-yellow-500" />{" "}
            </div>
            <div className="flex flex-col items-start">
              {/* Heading */}
              <h1 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
                {" "}
                Free Video Courses{" "}
              </h1>
              {/* Description */}
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-200 sm:text-base">
                {" "}
                Learn from industry experts and build your skills with{" "}
                <span className="font-medium text-yellow-500">
                  {" "}
                  completely free{" "}
                </span>{" "}
                video courses.{" "}
              </p>
            </div>
          </div>
          {/* Bottom line */}
          <div className="mt-5 h-1 w-16 rounded-full bg-yellow-400" />{" "}
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

        <div className="text-center text-lg text-gray-900 mt-8">
          <div className="mt-10 flex items-center justify-center">
            <Link
              href="/free-courses"
              className="border py-2 px-30 bg-gray-100  rounded border-gray-300 uppercase font-bold"
            >
              see all
            </Link>
          </div>
        </div>
      </div>

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
