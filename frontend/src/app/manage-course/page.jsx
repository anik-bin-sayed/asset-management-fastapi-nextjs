"use client";
import { Suspense } from "react";

import { useGetProfileQuery } from "../../lib/features/auth/authApi";
import Loader from "../../utils/Loader";
import ManageCourse from "../../components/ManageCourse";

const Page = () => {
  const { data, isLoading } = useGetProfileQuery();

  if (isLoading) return <Loader />;
  return (
    <Suspense fallback={<Loader />}>
      <ManageCourse profileData={data} />
    </Suspense>
  );
};

export default Page;
