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
      <span className="m-8 lg:mb-16">
        <h3 className="text-2xl">See your productivity grow.</h3>
        <h1 className="text-5xl font-light uppercase">
          Simple moves, <span className="font-bold">big results.</span>
        </h1>
      </span>
      <div className="relative w-full h-[150px] sm:h-4/6 lg:overflow-hidden flex sm:items-end sm:justify-center">
        {theme ? (
          <Image
            src={`/assets/dropzone-${theme}.png`}
            alt={`dropzone-${theme}-theme`}
            className={clsx("absolute object-cover h-64 sm:h-full sm:w-auto", {
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
