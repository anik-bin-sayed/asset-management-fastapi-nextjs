"use client";
import { Suspense } from "react";

import Loader from "../../../utils/Loader";
import { useGetProfileQuery } from "../../../lib/features/auth/authApi";
import ManageCourse from "../../../components/Admin/ManageCourse";

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
