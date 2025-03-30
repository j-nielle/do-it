import { type NextRequest, NextResponse } from "next/server";

import {
  DASHBOARD_ROUTE,
  ROOT_ROUTE,
  SESSION_COOKIE_NAME,
  protectedRoutes,
  authRoutes,
} from "@/lib/config/server";

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";

  if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(ROOT_ROUTE, request.url);

    return NextResponse.redirect(absoluteURL.toString());
  }

  if (session) {
    if (
      request.nextUrl.pathname === ROOT_ROUTE ||
      authRoutes.includes(request.nextUrl.pathname)
    ) {
      const absoluteURL = new URL(DASHBOARD_ROUTE, request.url);

      return NextResponse.redirect(absoluteURL.toString());
    }
  }
}
