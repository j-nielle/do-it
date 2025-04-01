import React from "react";

import ChartContextWrapper from "@/components/chart-context";
import BreadCrumb from "@/components/pages/breadcrumb";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/analytics", label: "Analytics" },
  ];

  return (
    <ChartContextWrapper>
      <BreadCrumb links={links} />
      {children}
    </ChartContextWrapper>
  );
}
