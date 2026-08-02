"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Nvbar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideNavbar =
    pathname === "/profile" ||
    pathname === "/profile/edit" ||
    pathname.startsWith("/users/");

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
