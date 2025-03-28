import React from "react";
import { dashboardMetadata } from "@/config/metadata";
import AnalyticsSection from "@/components/pages/dashboard/analytics/analytics-section";
import CalendarSection from "@/components/pages/dashboard/calendar/calendar-section";
import TaskDropzone from "@/components/pages/dashboard/tasks/task-dropzone";

export const metadata = dashboardMetadata;

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_256px] gap-4 w-full">
      <TaskDropzone />
      <AnalyticsSection />
      <CalendarSection />
    </div>
  );
}
