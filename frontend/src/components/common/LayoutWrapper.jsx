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

  const hideFooter = pathname.startsWith("/admin/manage-course");

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}
