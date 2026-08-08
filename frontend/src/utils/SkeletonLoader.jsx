import React from "react";

const SkeletonLoader = () => {
  const skeletonCards = Array(8).fill(null);

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
      {skeletonCards.map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col animate-pulse"
        >
          {/* Image placeholder */}
          <div className="relative h-48 w-full bg-gray-300"></div>

          {/* Content placeholder */}
          <div className="p-5 flex flex-col grow space-y-3">
            {/* Title */}
            <div className="h-5 bg-gray-300 rounded w-3/4"></div>
            {/* Description lines */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>

            {/* Meta row (duration & language) */}
            <div className="flex items-center justify-between mt-2">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <div className="h-5 bg-gray-300 rounded-full w-14"></div>
            </div>

            {/* Tags placeholder */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <div className="h-5 bg-gray-300 rounded-full w-12"></div>
              <div className="h-5 bg-gray-300 rounded-full w-16"></div>
            </div>

            {/* Button placeholder */}
            <div className="h-10 bg-gray-300 rounded-lg w-full mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
