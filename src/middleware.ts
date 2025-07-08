import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

const protectedRoutes = ["/test"];

const adminRoutes = ["/dashboard"];

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const pathname = request.nextUrl.pathname;
  const isAdmin =
    session?.user?.email?.toLocaleLowerCase() === process.env.ADMIN;

  // If user is authenticated and trying to access protected route, redirect to sign-in.
  if (!session?.user && protectedRoutes.includes(pathname))
    return NextResponse.redirect(new URL("/sign-in", request.url));

  // If user is authenticated and trying to access sign-in page, redirect to dashboard.
  if (session?.user && pathname.startsWith("/sign-in"))
    return NextResponse.redirect(new URL("/", request.url));

  // If user is not Admin and trying to access admin routes, redirect to dashboard.
  if (session?.user && !isAdmin && adminRoutes.includes(pathname))
    return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
