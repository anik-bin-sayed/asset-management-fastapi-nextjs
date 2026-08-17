"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  useDeleteCourseMutation,
  useGetAllCourseQuery,
} from "@/lib/features/courses/paid-course-api";
import {
  LuBookOpen,
  LuEye,
  LuPencil,
  LuPlus,
  LuSearch,
  LuTrash2,
  LuX,
} from "react-icons/lu";
import AllCourseLoader from "./AllCourseLoader";
import AllCourseError from "./AllCourseError";
import Filter from "./Filter";
import { TbCurrencyTaka } from "react-icons/tb";
import { useRouter } from "next/navigation";

const AllCourse = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [courseType, setCourseType] = useState("all");
  const [level, setLevel] = useState("all");
  const [language, setLanguage] = useState("all");

  const [deletingCourseId, setDeletingCourseId] = useState(null);

  // redux
  const { data, isLoading, isFetching, isError, error } = useGetAllCourseQuery({
    page: 1,
    limit: 10,
  });
  const [deleteCourse] = useDeleteCourseMutation();

  const router = useRouter();

  const courses = data?.data ?? [];

  // STATS
  const totalCourses = courses.length;

  const publishedCourses = courses.filter(
    (course) => course.status === "published",
  ).length;

  const draftCourses = courses.filter(
    (course) => course.status === "draft",
  ).length;

  const freeCourses = courses.filter(
    (course) => course.course_type === "free",
  ).length;

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        !search ||
        course.title?.toLowerCase().includes(search.toLowerCase()) ||
        course.short_description?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "all" ||
        course.status?.toLowerCase() === status.toLowerCase();

      // Course Type
      const matchesCourseType =
        courseType === "all" ||
        course.course_type?.toLowerCase() === courseType.toLowerCase();

      // Level
      const matchesLevel =
        level === "all" || course.level?.toLowerCase() === level.toLowerCase();

      // Language
      const matchesLanguage =
        language === "all" ||
        course.language?.toLowerCase() === language.toLowerCase();

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCourseType &&
        matchesLevel &&
        matchesLanguage
      );
    });
  }, [courses, search, status, courseType, level, language]);

  // RESET FILTER
  const resetFilters = () => {
    setSearch("");
    setStatus("all");
    setCourseType("all");
    setLevel("all");
    setLanguage("all");
  };

  const hasFilter =
    search ||
    status !== "all" ||
    courseType !== "all" ||
    level !== "all" ||
    language !== "all";

  if (isLoading) return <AllCourseLoader />;

  if (isError) return <AllCourseError />;

  const handleDeleteCourse = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course? This action cannot be undone.",
    );

    if (!confirmed) return;

    setDeletingCourseId(id);

    try {
      const res = await deleteCourse(id).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingCourseId(null);
    }
  };

  const handleCreateRoute = () => {
    router.push("/manage-course?tab=create-course");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Courses</h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage and organize all your courses.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-black cursor-pointer transition hover:bg-yellow-500"
            onClick={handleCreateRoute}
          >
            <LuPlus className="text-lg" />
            Create Course
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Courses</p>

            <div className="mt-3 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                {totalCourses}
              </h3>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <LuBookOpen className="text-gray-600" />
              </div>
            </div>
          </div>

          {/* Published */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Published</p>

            <div className="mt-3 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                {publishedCourses}
              </h3>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                Live
              </span>
            </div>
          </div>

          {/* Draft */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Drafts</p>

            <div className="mt-3 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                {draftCourses}
              </h3>

              <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-600">
                Draft
              </span>
            </div>
          </div>

          {/* Free */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Free Courses</p>

            <div className="mt-3 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                {freeCourses}
              </h3>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                Free
              </span>
            </div>
          </div>
        </div>

        {/* FILTER */}
        <Filter
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          courseType={courseType}
          setCourseType={setCourseType}
          level={level}
          setLevel={setLevel}
          language={language}
          setLanguage={setLanguage}
          filteredCourses={filteredCourses}
          courses={courses}
          hasFilter={hasFilter}
          resetFilters={resetFilters}
        />
        {/*  FETCHING  */}

        {isFetching && !isLoading && (
          <div className="mb-4 text-sm text-gray-500">Updating courses...</div>
        )}

        {filteredCourses.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => {
              const price = Number(course.price || 0);
              const discountPrice = Number(course.discount_price || 0);

              const statusLabel =
                course.status?.charAt(0).toUpperCase() +
                course.status?.slice(1);

              const typeLabel =
                course.course_type?.charAt(0).toUpperCase() +
                course.course_type?.slice(1);

              const levelLabel =
                course.level?.charAt(0).toUpperCase() + course.level?.slice(1);

              const languageLabel =
                course.language?.charAt(0).toUpperCase() +
                course.language?.slice(1);

              return (
                <div
                  key={course.id}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {course.thumbnail ? (
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover transition duration-300 "
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <LuBookOpen className="text-4xl text-gray-300" />
                      </div>
                    )}

                    {/* Status */}
                    <div className="absolute left-3 top-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          course.status === "published"
                            ? "bg-green-100 text-green-700"
                            : course.status === "draft"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {statusLabel}
                      </span>
                    </div>

                    {/* Type */}
                    <div className="absolute right-3 top-3">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 backdrop-blur">
                        {typeLabel}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Language / Level */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-500">
                        {languageLabel}
                      </span>

                      <span className="text-gray-300">•</span>

                      <span className="text-xs font-medium text-gray-500">
                        {levelLabel}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="line-clamp-2 text-base font-semibold leading-6 text-gray-900">
                      {course.title}
                    </h2>

                    {/* Description */}
                    <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-500">
                      {course.short_description || "No description available."}
                    </p>

                    {/* date & price */}
                    <div className="flex items-center justify-between">
                      <div className="mt-4 text-xs text-gray-400">
                        {course.start_date ? (
                          <>
                            Start:{" "}
                            {new Date(course.start_date).toLocaleDateString()}
                          </>
                        ) : (
                          "No start date"
                        )}
                      </div>

                      <div className="mt-5 flex items-center gap-2">
                        {course.course_type === "free" ? (
                          <span className="text-lg font-bold text-green-600">
                            Free
                          </span>
                        ) : (
                          <>
                            <span className="text-lg font-bold text-gray-900 flex items-center">
                              <TbCurrencyTaka />
                              {discountPrice > 0 ? discountPrice : price}
                            </span>

                            {discountPrice > 0 && discountPrice < price && (
                              <span className="text-sm line-through flex items-center text-red-500">
                                <TbCurrencyTaka />
                                {price}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">
                      <button
                        type="button"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                      >
                        <LuPencil />
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={deletingCourseId === course.id}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        {deletingCourseId === course.id ? (
                          <>
                            <span
                              className="h-4 w-4 animate-spin rounded-full border-2 border-red-500/30 border-t-red-500"
                              aria-hidden="true"
                            />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <LuTrash2 />
                            Delete
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <LuBookOpen className="text-xl text-gray-500" />
            </div>

            <h3 className="mt-4 text-base font-semibold text-gray-900">
              No courses found
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
              Try changing your search or filters.
            </p>

            {hasFilter && (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
              >
                <LuX />
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourse;
