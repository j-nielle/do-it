"use client";

import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import React from "react";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export default function UIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return <HeroUIProvider navigate={router.push}>{children}</HeroUIProvider>;
}
