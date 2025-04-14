"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function TopLoader({ isLoading = false }: { isLoading?: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    setLoading(true);
    setProgress(20);

    const interval = setInterval(() => {
      setProgress((old) => (old < 90 ? old + 10 : old));
    }, 200);

    const timeout = setTimeout(() => {
      setProgress(100);
      clearInterval(interval);
    }, 800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [pathname, searchParams]);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [progress]);

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "3px",
        width: `${progress}%`,
        backgroundColor: "#29D",
        transition: "width 0.2s ease, opacity 0.4s ease",
        zIndex: 9999,
      }}></div>
  );
}
