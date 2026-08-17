import React, { useEffect, useState } from "react";
import { useUpdateCategoryMutation } from "../../../lib/features/category/category-api";

const initialState = {
  name: "",
  description: "",
};
const UpdateCategoryModal = ({ onClose, setCategoryData, categoryData }) => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  //   redux
  const [updateCategory, { isLoading, isError }] = useUpdateCategoryMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    onClose();
    setCategoryData(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateCategory({
        id: categoryData?.id,
        data: formData,
      }).unwrap();
      //   console.log(res);
    } catch (error) {
      //   console.log(error?.data?.detail || "Something wrong");
      setError(error?.data?.detail || "Something wrong");
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    setFormData({
      name: categoryData?.name || "",
      description: categoryData?.description || "",
    });
  }, [categoryData]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Create Category
          </h2>

          <button
            type="button"
            onClick={handleClose}
            className="text-2xl text-gray-400 hover:text-gray-600 px-2 flex items-center justify-center cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Title
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter category title"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              placeholder="Enter category description"
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-yellow-400 px-5 py-2 text-sm font-medium text-black hover:bg-yellow-500 cursor-pointer"
            >
              {isLoading ? "Updating" : " update Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
