"use client";

const UserProfileLoader = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Fake Navbar */}
      <div className="h-16 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="h-7 w-32 animate-pulse rounded-md bg-slate-200" />

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200" />
            <div className="hidden h-4 w-20 animate-pulse rounded bg-slate-200 sm:block" />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Mobile top bar */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <div className="h-8 w-28 animate-pulse rounded-md bg-slate-200" />
          <div className="h-8 w-8 animate-pulse rounded-md bg-slate-200" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* LEFT PROFILE SKELETON */}

          <aside className="h-fit">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="px-6 pb-7 pt-8">
                <div className="flex flex-col items-center">
                  {/* Avatar */}
                  <div className="h-32 w-32 animate-pulse rounded-full bg-slate-200" />

                  {/* Name */}
                  <div className="mt-5 h-7 w-40 animate-pulse rounded-md bg-slate-200" />

                  {/* Country */}
                  <div className="mt-3 h-4 w-24 animate-pulse rounded bg-slate-200" />

                  {/* Email */}
                  <div className="mt-3 h-4 w-48 max-w-full animate-pulse rounded bg-slate-200" />

                  {/* Role */}
                  <div className="mt-4 h-7 w-20 animate-pulse rounded-full bg-slate-200" />
                </div>

                {/* Bio */}
                <div className="mt-7 border-t border-slate-100 pt-6">
                  <div className="mx-auto h-3 w-full animate-pulse rounded bg-slate-200" />
                  <div className="mx-auto mt-2 h-3 w-5/6 animate-pulse rounded bg-slate-200" />
                  <div className="mx-auto mt-2 h-3 w-2/3 animate-pulse rounded bg-slate-200" />
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="grid grid-cols-2 border-t border-slate-100 bg-slate-50">
                <div className="px-4 py-4 text-center">
                  <div className="mx-auto h-3 w-20 animate-pulse rounded bg-slate-200" />
                  <div className="mx-auto mt-2 h-4 w-16 animate-pulse rounded bg-slate-200" />
                </div>

                <div className="border-l border-slate-200 px-4 py-4 text-center">
                  <div className="mx-auto h-3 w-16 animate-pulse rounded bg-slate-200" />
                  <div className="mx-auto mt-2 h-4 w-20 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT SKELETON */}

          <section className="min-w-0">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Header */}
              <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="h-6 w-48 animate-pulse rounded-md bg-slate-200" />

                    <div className="mt-2 h-4 w-64 max-w-full animate-pulse rounded bg-slate-200" />
                  </div>

                  {/* ID */}
                  <div className="h-10 w-44 animate-pulse rounded-xl bg-slate-200" />
                </div>
              </div>

              {/* Information Grid */}
              <div className="p-5 sm:p-7">
                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoSkeleton />
                  <InfoSkeleton />

                  <InfoSkeleton />
                  <InfoSkeleton />

                  <InfoSkeleton />
                  <InfoSkeleton />

                  <InfoSkeleton />
                  <InfoSkeleton />

                  <InfoSkeleton />
                  <InfoSkeleton />

                  <InfoSkeleton />
                  <InfoSkeleton />

                  <InfoSkeleton />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

/* INFO CARD SKELETON */

const InfoSkeleton = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      {/* Icon */}
      <div className="h-10 w-10 animate-pulse rounded-lg bg-slate-200" />

      {/* Title */}
      <div className="mt-4 h-3 w-20 animate-pulse rounded bg-slate-200" />

      {/* Value */}
      <div className="mt-2 h-4 w-32 max-w-full animate-pulse rounded bg-slate-200" />
    </div>
  );
};

export default UserProfileLoader;
