"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { DASHBOARD_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from "@/lib/constants";

export async function createSession(uid: string) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  redirect(DASHBOARD_ROUTE);
}

export async function removeSession() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE_NAME);

  redirect(ROOT_ROUTE);
}
