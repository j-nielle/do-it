import React from "react";

import { dashboardMetadata } from "@/config/metadata";
import AnalyticsSection from "@/components/pages/dashboard/analytics/analytics-section";
import TaskDropzone from "@/components/pages/dashboard/tasks/task-dropzone";

export const metadata = dashboardMetadata;

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full">
      <TaskDropzone />
      <AnalyticsSection />
    </div>
  );
}
