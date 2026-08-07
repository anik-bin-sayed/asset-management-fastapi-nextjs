import Link from "next/link";
import React from "react";

const ManageCoursesLinks = ({ isOpen }) => {
  return (
    <div
      className={`absolute left-0 top-full mt-2 w-72 overflow-hidden transition-all duration-300 ease-in-out z-50 ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-lg space-y-2">
        <Link href="#" className="block py-2 px-3 rounded hover:bg-yellow-100">
          Add New Course
        </Link>

        <Link href="#" className="block py-2 px-3 rounded hover:bg-yellow-100">
          Edit Existing Course
        </Link>

        <Link href="#" className="block py-2 px-3 rounded hover:bg-yellow-100">
          Course Settings
        </Link>

        <Link href="#" className="block py-2 px-3 rounded hover:bg-yellow-100">
          Enrollments
        </Link>
      </div>
    </div>
  );
};

export default ManageCoursesLinks;
