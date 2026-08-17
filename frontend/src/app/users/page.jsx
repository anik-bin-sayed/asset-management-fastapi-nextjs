"use client";

import AllUser from "../../components/AllUser/AllUser";
import { useAllUsersQuery } from "../../lib/features/profile/profileApi";
import Loader from "../../utils/Loader";
import { useState } from "react";

const Page = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useAllUsersQuery({
    page,
    limit: 30,
    search,
  });

  console.log(search);

  // const [updateRole, { isLoading: isUpdating }] = useUpdateUserRoleMutation();

  const handleSearch = (term) => {
    setSearch(term);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

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
