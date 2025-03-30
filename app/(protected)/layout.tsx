import React from "react";

import ChartContextWrapper from "@/components/task-context";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChartContextWrapper>{children}</ChartContextWrapper>;
}
