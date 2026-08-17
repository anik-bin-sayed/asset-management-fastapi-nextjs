import {
  useDeleteFreeCourseMutation,
  useGetAllFreeCoursesQuery,
} from "../../lib/features/courses/free-course-api";
import React, { useState } from "react";
import VideoModal from "../Home/VideoModal";
import Link from "next/link";
import Image from "next/image";
import SkeletonLoader from "../../utils/SkeletonLoader";
import { useRouter } from "next/navigation";

const FreeVideoList = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [deletingId, setDeletingId] = useState(null);

  const router = useRouter();

  // redux
  const {
    data: freeCoursesData,
    isLoading: isFreeCoursesLoading,
    refetch,
  } = useGetAllFreeCoursesQuery();
  const [deleteFreeCourse, { isLoading: deleting }] =
    useDeleteFreeCourseMutation();

  if (isFreeCoursesLoading) {
    return <SkeletonLoader />;
  }

  const handleEdit = (course) => {
    console.log(course?.slug);
    router.push(
      `/manage-course?tab=edit-course&slug=${encodeURIComponent(course.slug)}`,
    );
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await deleteFreeCourse(id).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingId(null);
    }
    console.log(id);
  };

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
        {freeCoursesData?.data?.map((course) => (
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

              <div className="mt-5 grid grid-cols-3 gap-2">
                {/* Watch */}
                <button
                  type="button"
                  onClick={() => setSelectedCourse(course)}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-yellow-400 px-3 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:bg-yellow-500 hover:shadow-md active:scale-95"
                >
                  Watch
                </button>

                {/* Edit */}
                <button
                  type="button"
                  onClick={() => handleEdit(course)}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2.5 text-sm font-medium text-blue-700 transition-all duration-200 hover:bg-blue-100 hover:shadow-md active:scale-95"
                >
                  Edit
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => handleDelete(course?.id)}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-100 hover:shadow-md active:scale-95"
                >
                  {deletingId == course?.id ? "Deleting" : "Delete"}
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
        {freeCoursesData && freeCoursesData.length > 7 && (
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

export default FreeVideoList;
