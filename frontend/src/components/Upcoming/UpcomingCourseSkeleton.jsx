const UpcomingCourseSkeleton = () => {
  return (
    <main className="animate-pulse bg-gray-50">
      <section className="mx-auto mt-20 max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        {/* Category Skeleton */}
        <div className="mb-14 rounded-xl bg-white p-10 shadow ring-1 ring-gray-200">
          {/* Category Title */}
          <div className="mb-10 flex justify-center">
            <div className="h-8 w-52 rounded bg-gray-200 sm:h-9" />
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                {/* Thumbnail */}
                <div className="h-48 w-full bg-gray-200" />

                {/* Content */}
                <div className="flex flex-col p-5">
                  {/* Title */}
                  <div className="space-y-2">
                    <div className="h-5 w-full rounded bg-gray-200" />
                    <div className="h-5 w-3/4 rounded bg-gray-200" />
                  </div>

                  {/* Description */}
                  <div className="mt-3 space-y-2">
                    <div className="h-3 w-full rounded bg-gray-100" />
                    <div className="h-3 w-5/6 rounded bg-gray-100" />
                  </div>

                  {/* Duration + Language */}
                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="h-4 w-20 rounded bg-gray-200" />
                    <div className="h-6 w-16 rounded-full bg-gray-200" />
                  </div>

                  {/* Button */}
                  <div className="mt-5 h-10 w-full rounded-lg bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <div className="h-10 w-24 rounded-lg bg-gray-200" />

          <div className="h-10 w-10 rounded-lg bg-gray-200" />
          <div className="h-10 w-10 rounded-lg bg-gray-200" />
          <div className="h-10 w-10 rounded-lg bg-gray-200" />

          <div className="h-10 w-20 rounded-lg bg-gray-200" />
        </div>
      </section>
    </main>
  );
};

export default UpcomingCourseSkeleton;
