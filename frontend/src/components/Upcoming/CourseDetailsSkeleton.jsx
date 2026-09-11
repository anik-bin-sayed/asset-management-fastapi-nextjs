"use client";

const CourseDetailsSkeleton = () => {
  return (
    <main className="min-h-screen animate-pulse bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 pt-28 pb-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              {/* Badges */}
              <div className="mb-5 flex flex-wrap gap-3">
                <div className="h-8 w-36 rounded-full bg-gray-700" />
                <div className="h-8 w-28 rounded-full bg-gray-700" />
              </div>

              {/* Title */}
              <div className="space-y-3">
                <div className="h-10 w-full rounded bg-gray-700 sm:h-12" />
                <div className="h-10 w-4/5 rounded bg-gray-700 sm:h-12" />
              </div>

              {/* Description */}
              <div className="mt-5 space-y-3">
                <div className="h-4 w-full rounded bg-gray-700" />
                <div className="h-4 w-11/12 rounded bg-gray-700" />
                <div className="h-4 w-3/4 rounded bg-gray-700" />
              </div>

              {/* Course Meta */}
              <div className="mt-7 flex flex-wrap gap-5">
                <div className="h-5 w-24 rounded bg-gray-700" />
                <div className="h-5 w-20 rounded bg-gray-700" />
                <div className="h-5 w-24 rounded bg-gray-700" />
              </div>
            </div>

            {/* Thumbnail */}
            <div className="overflow-hidden rounded-2xl bg-gray-800 shadow-2xl">
              <div className="aspect-video w-full bg-gray-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* About Course */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-8">
              <div className="h-7 w-52 rounded bg-gray-200" />

              <div className="mt-5 space-y-3">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-11/12 rounded bg-gray-200" />
                <div className="h-4 w-4/5 rounded bg-gray-200" />
              </div>

              <div className="mt-4 space-y-3">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-10/12 rounded bg-gray-200" />
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-8">
              <div className="h-7 w-48 rounded bg-gray-200" />

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-lg bg-gray-50 p-4"
                  >
                    <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-gray-200" />

                    <div className="h-5 w-4/5 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>

            {/* Course Information */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-8">
              <div className="h-7 w-52 rounded bg-gray-200" />

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-xl border border-gray-100 p-4"
                  >
                    <div className="h-11 w-11 shrink-0 rounded-lg bg-gray-200" />

                    <div className="w-full space-y-2">
                      <div className="h-3 w-16 rounded bg-gray-200" />
                      <div className="h-5 w-24 rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Schedule */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-8">
              <div className="h-7 w-48 rounded bg-gray-200" />

              <div className="mt-6 space-y-4">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-xl bg-gray-50 p-5"
                  >
                    <div className="h-12 w-12 shrink-0 rounded-full bg-gray-200" />

                    <div className="space-y-2">
                      <div className="h-3 w-24 rounded bg-gray-200" />
                      <div className="h-5 w-40 rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside>
            <div className="sticky top-24 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200">
              {/* Price */}
              <div className="border-b border-gray-100 p-6">
                <div className="h-4 w-24 rounded bg-gray-200" />

                <div className="mt-3 flex items-end gap-3">
                  <div className="h-9 w-28 rounded bg-gray-200" />
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </div>

                <div className="mt-3 h-6 w-24 rounded-full bg-gray-200" />
              </div>

              {/* Enrollment */}
              <div className="p-6">
                <div className="h-12 w-full rounded-xl bg-gray-200" />

                <div className="mx-auto mt-4 h-3 w-56 rounded bg-gray-200" />

                {/* Includes */}
                <div className="mt-7">
                  <div className="h-5 w-40 rounded bg-gray-200" />

                  <div className="mt-4 space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded bg-gray-200" />
                        <div className="h-4 w-36 rounded bg-gray-200" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default CourseDetailsSkeleton;
