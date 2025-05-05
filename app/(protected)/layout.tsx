import React from "react";

import BreadCrumb from "@/components/pages/breadcrumb";
import TaskContextProvider from "@/components/task-context";

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
    <TaskContextProvider>
      <section className="px-6 py-4">
        <BreadCrumb links={links} />
        {children}
      </section>
    </TaskContextProvider>
  );
}
