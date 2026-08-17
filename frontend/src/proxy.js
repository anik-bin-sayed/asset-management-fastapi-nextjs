import { NextResponse } from "next/server";

export function proxy(request) {
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const pathname = request.nextUrl.pathname;

  const isAuthenticatedRoute =
    pathname.startsWith("/profile") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/users") ||
    pathname.startsWith("/manage-course");

  if (isAuthenticatedRoute && !refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
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
