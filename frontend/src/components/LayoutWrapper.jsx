"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Nvbar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideNavbar = pathname === "/profile";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
