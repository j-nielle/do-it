import { auth, googleProvider } from "@/config/firebase";
import {
  signInWithPopup,
  signOut,
  type User,
  onAuthStateChanged,
} from "firebase/auth";
import { createSession, removeSession } from "@/lib/actions/auth";

export const handleAuthChange = (callback: (authUser: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const handleLoginWithGoogle = async () => {
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
};

export const handleLogout = async () => {
  try {
    await signOut(auth);
    await removeSession();
  } catch (error) {
    console.error("Error signing out:", error);
  }
};