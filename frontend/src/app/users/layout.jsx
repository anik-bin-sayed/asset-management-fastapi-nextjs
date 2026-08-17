"use client";

import AdminGuard from "../../components/auth/AdminGuard";

const AdminLayout = ({ children }) => {
  return <AdminGuard>{children}</AdminGuard>;
};

export default AdminLayout;
