"use client";

import React, { useState } from "react";
import CategoryModal from "../CategoryModal";
import { useGetAllCategoryQuery } from "@/lib/features/category/category-api";

const initialState = {
  title: "",
  slug: "",
  short_description: "",
  description: "",
  price: "",
  discount_price: "",
  level: "beginner",
  language: "bangla",
  course_type: "paid",
  category_id: "",
  start_date: "",
  end_date: "",
};

const CreateCourse = () => {
  const [formData, setFormData] = useState(initialState);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const { data: categories, isLoading } = useGetAllCategoryQuery();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Create New Course
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Create and configure your course information.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Basic Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Enter the basic information about your course.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Course Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Complete Python Programming"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>

                {/* Category */}
                <div className="w-full">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Category
                  </label>

                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  >
                    <option value="">Select category</option>
                    {categories &&
                      categories?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                  <div>
                    <button
                      onClick={() => setIsCategoryModalOpen(true)}
                      className="text-sm mt-2 ml-2 hover:underline cursor-pointer text-gray-400"
                    >
                      Create Category
                    </button>
                  </div>
                </div>

                {/* Short Description */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Short Description
                  </label>

                  <textarea
                    name="short_description"
                    value={formData.short_description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Write a short description of your course..."
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Course Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={7}
                    placeholder="Write the full course description..."
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
              </div>
            </div>

            {/* Course Settings */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Course Settings
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Configure course level, language and type.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {/* Level */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Level
                  </label>

                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Language
                  </label>

                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  >
                    <option value="bangla">Bangla</option>
                    <option value="english">English</option>
                  </select>
                </div>

                {/* Course Type */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Course Type
                  </label>

                  <select
                    name="course_type"
                    value={formData.course_type}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  >
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Pricing</h2>

                <p className="mt-1 text-sm text-gray-500">
                  Set the price for your course.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Price
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      ৳
                    </span>

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="1500"
                      className="w-full rounded-xl border border-gray-300 py-3 pl-9 pr-4 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Discount Price
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      ৳
                    </span>

                    <input
                      type="number"
                      name="discount_price"
                      value={formData.discount_price}
                      onChange={handleChange}
                      placeholder="999"
                      className="w-full rounded-xl border border-gray-300 py-3 pl-9 pr-4 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Course Schedule
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Set when the course will start and end.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Start Date
                  </label>

                  <input
                    type="datetime-local"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    End Date
                  </label>

                  <input
                    type="datetime-local"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Course Thumbnail
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Upload an attractive thumbnail for your course.
                </p>
              </div>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-12 text-center transition hover:border-gray-500">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  📷
                </div>

                <p className="text-sm font-medium text-gray-700">
                  Click to upload thumbnail
                </p>

                <p className="mt-1 text-xs text-gray-400">PNG, JPG or WEBP</p>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                />
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pb-8">
              <button
                type="button"
                className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-gray-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Create Course
              </button>
            </div>
          </form>
        </div>
      </div>

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </>
  );
};

export default CreateCourse;
