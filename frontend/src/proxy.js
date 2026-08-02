import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("access_token")?.value;

  const protectedRoutes = ["/profile", "/dashboard", "/users"];

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*", "/users/:path*"],
};
