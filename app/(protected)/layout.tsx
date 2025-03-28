import TaskContextWrapper from "@/components/task-context";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TaskContextWrapper>{children}</TaskContextWrapper>;
}
