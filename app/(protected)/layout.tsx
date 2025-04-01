import React from "react";

import ChartContextWrapper from "@/components/task-context";
import BreadCrumb from "@/components/pages/dashboard/breadcrumb";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChartContextWrapper>
      <BreadCrumb />
      {children}
    </ChartContextWrapper>
  );
}
