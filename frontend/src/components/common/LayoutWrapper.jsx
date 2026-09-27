"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideNavbar =
    pathname === "/profile" ||
    pathname === "/profile/edit" ||
    pathname.startsWith("/admin/manage-course");

  const hideFooter =
    pathname.startsWith("/admin/manage-course") ||
    pathname.startsWith("/admin/users") ||
    pathname.startsWith("/admin/profile") ||
    pathname.startsWith("/profile");

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}
