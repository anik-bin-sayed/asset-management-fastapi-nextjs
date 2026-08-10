import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function proxy(request) {
  const token = request.cookies.get("access_token")?.value;

  const pathname = request.nextUrl.pathname;

  // Protected routes
  const isAuthenticatedRoute =
    pathname.startsWith("/profile") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/users") ||
    pathname.startsWith("/manage-course");

  if (isAuthenticatedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Admin-only routes
  const isAdminRoute =
    pathname.startsWith("/users") || pathname.startsWith("/manage-course");

  if (isAdminRoute) {
    try {
      const decoded = jwtDecode(token);

      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/dashboard/:path*",
    "/users/:path*",
    "/manage-course/:path*",
  ],
};
