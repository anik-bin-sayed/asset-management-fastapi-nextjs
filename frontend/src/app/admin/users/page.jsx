"use client";

import { useState } from "react";

import AllUser from "../../../components/Admin/AllUser";
import { useAllUsersQuery } from "../../../lib/features/profile/profileApi";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, isError, refetch } = useAllUsersQuery({
    page,
    limit: 30,
    search,
  });

  // const [updateRole, { isLoading: isUpdating }] = useUpdateUserRoleMutation();

  const handleSearch = (term) => {
    setSearch(term);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRoleChange = async () => {
    try {
      refetch();
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  if (isError) return <div>Error occurred while fetching users.</div>;

  return (
    <AllUser
      users={data?.users || []}
      pagination={data?.pagination || {}}
      onSearch={handleSearch}
      // setSearch={setSearch}
      onPageChange={handlePageChange}
      onRoleChange={handleRoleChange}
      isLoading={isLoading}
    />
  );
};

export default Page;
