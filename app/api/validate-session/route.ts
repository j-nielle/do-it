import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/lib/config/server";

export async function GET() {
  const cookieStore = await cookies();
  const hasCookie = cookieStore.has(SESSION_COOKIE_NAME);
  return NextResponse.json({
    isAuthenticated: hasCookie,
  });
}
