"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase/client";
import LoadingPage from "@/app/(protected)/loading";

export const AuthContext = createContext<{
  isAuthenticated?: boolean;
  user: User | null;
}>({
  isAuthenticated: false,
  user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function checkSession() {
    try {
      const response = await fetch("/api/validate-session");
      const data = await response.json();
      setIsAuthenticated(data.isAuthenticated);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);

      setIsAuthenticated(!!firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && user) {
      auth.signOut();
    }
  }, [isAuthenticated, user]);

  // useEffect(() => {
  //   console.log(isAuthenticated, user)
  // }, [isAuthenticated, user]);

  return (
    <>
      <AuthContext.Provider value={{ isAuthenticated, user }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
