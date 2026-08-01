"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const GenderSelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const options = ["Male", "Female", "Other"];

  return (
    <div className="relative w-full">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Gender
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-11 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4"
      >
        <span>{value || "Select Gender"}</span>

        <FaChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute z-50 mt-2 w-full overflow-hidden rounded-lg border bg-white shadow-lg transition-all duration-300 ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0 border-transparent"
        }`}
      >
        {options.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              onChange(item);
              setOpen(false);
            }}
            className="block w-full px-4 py-3 text-left hover:bg-yellow-100"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenderSelect;
