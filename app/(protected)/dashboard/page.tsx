import React from "react";
import AnalyticsSection from "@/components/pages/dashboard/analytics/analytics-section";
import CalendarSection from "@/components/pages/dashboard/calendar/calendar-section";
import TaskDropzone from "@/components/pages/dashboard/tasks/task-dropzone";
import { dashboardMetadata } from "@/config/metadata";

export const metadata = dashboardMetadata;

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <TaskDropzone />
      <AnalyticsSection />
      <CalendarSection />
    </div>
  );
}
