import AdminGuard from "../../components/auth/AdminGuard";
import React from "react";

const layout = ({ children }) => {
  return <AdminGuard>{children}</AdminGuard>;
};

export default layout;
