import AdminInstructorGuard from "../../../components/auth/AdminInstructorGuard";

const layout = ({ children }) => {
  return <AdminInstructorGuard>{children}</AdminInstructorGuard>;
};

export default layout;
