import React from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

const Search = () => {
  return (
    <div className="relative w-full max-w-md">
      <div className="group relative">
        <input
          type="text"
          placeholder="What do you want to learn?"
          className="
          w-full
          rounded-xl
          border border-gray-200
          bg-white
          py-3
          pl-12
          pr-14
          text-[15px]
          text-gray-700
          shadow-sm
          outline-none
          transition-all
          duration-300
          placeholder:text-gray-400
          hover:border-yellow-300
          hover:shadow-md
          focus:border-yellow-400
          focus:shadow-[0_0_0_4px_rgba(250,204,21,0.12)]
        "
        />

        <HiMagnifyingGlass
          className="
          absolute
          left-4
          top-1/2
          h-5
          w-5
          -translate-y-1/2
          text-gray-400
          transition-colors
          duration-300
          group-focus-within:text-yellow-500
        "
        />

        <button
          type="button"
          className="
          absolute
          right-1.5
          top-1/2
          flex
          h-9
          w-9
          -translate-y-1/2
          items-center
          justify-center
          rounded-lg
          bg-yellow-400
          text-black
          shadow-sm
          transition-all
          duration-300
          hover:bg-yellow-500
          hover:shadow-md
          active:scale-95
        "
        >
          <HiMagnifyingGlass className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Search;
