// app/components/landing-page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import clsx from "clsx";

export default function LandingPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <span className="mb-16">
        <h3 className="text-2xl">See your productivity grow.</h3>
        <h1 className="text-5xl font-light uppercase">
          Simple moves, <span className="font-bold">big results.</span>
        </h1>
      </span>
      <div className="relative w-full h-4/6 overflow-hidden">
        {theme ? (
          <Image
            src={`/assets/dropzone-${theme}.png`}
            alt={`dropzone-${theme}-theme`}
            className={clsx("absolute top-0 object-cover", {
              "shadow-md": theme === "light",
            })}
            width={1250}
            height={1250}
          />
        ) : null}
      </div>
    </>
  );
}
