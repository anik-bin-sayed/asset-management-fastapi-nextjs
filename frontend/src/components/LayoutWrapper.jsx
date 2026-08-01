"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Nvbar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideNavbar = pathname === "/profile" || pathname === "/profile/edit";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
