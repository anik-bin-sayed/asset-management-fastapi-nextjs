"use client";

import AllUser from "@/components/AllUser/AllUser";
import { useAllUsersQuery } from "@/lib/features/profile/profileApi";
import Loader from "@/utils/Loader";
import { useState } from "react";

const Page = () => {
  // Local state for search and pagination
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Fetch users with the current page and search term
  const { data, isLoading, isError } = useAllUsersQuery({
    page,
    limit: 30,
    search,
  });

  console.log(search);

  // Mutation for changing user role
  // const [updateRole, { isLoading: isUpdating }] = useUpdateUserRoleMutation();

  // Callback for search – resets to page 1
  const handleSearch = (term) => {
    setSearch(term);
    setPage(1);
  };

  // Callback for page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Callback for role change
  const handleRoleChange = async (userId, newRole) => {
    try {
      // await updateRole({ userId, role: newRole }).unwrap();
      // Refetch the user list to reflect the updated role
      refetch();
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  // Loading and error states
  if (isLoading) return <Loader />;
  if (isError) return <div>Error occurred while fetching users.</div>;

  return (
    <AllUser
      users={data?.users || []}
      pagination={data?.pagination || {}}
      onSearch={handleSearch}
      setSearch={setSearch}
      onPageChange={handlePageChange}
      onRoleChange={handleRoleChange}
    />
  );
};

export default Page;
