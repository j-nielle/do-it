'use client'

import {
  NextOrObserver,
  onAuthStateChanged,
  onIdTokenChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "./client";
import { createSession, removeSession } from "@/lib/actions/auth";

export function handleAuthStateChanged(cb: NextOrObserver<User>) {
  return onAuthStateChanged(auth, cb);
}

export function handleIdTokenChanged(cb: NextOrObserver<User>) {
  return onIdTokenChanged(auth, cb);
}

export async function handleGoogleLogin() {
  try {
    const cred = await signInWithPopup(auth, googleProvider);

    if (!cred) {
      throw new Error("Google login failed");
    } else {
      await createSession(cred.user.uid);
    }
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function handleLogout() {
  try {
    await auth.signOut();
    await removeSession();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
