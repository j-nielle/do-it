import ChartContextWrapper from "@/components/task-context";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChartContextWrapper>{children}</ChartContextWrapper>;
}
