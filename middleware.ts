import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/register", "/forgot-password"];
const protectedRoutes = ["/blog/new"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("__session")?.value;
  const isLoggedIn = !!token;
  const { pathname } = req.nextUrl;
  console.log(pathname);

  if (isLoggedIn && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isLoggedIn && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(`/login?next=${pathname}`, req.url));
  }

  if (!isLoggedIn && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL(`/login?next=${pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/forgot-password",
    "/blog/new",
    "/admin/:path*",
  ],
};
