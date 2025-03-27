import React from "react";
import AnalyticsSection from "@/components/analytics/analytics-section";
import CalendarSection from "@/components/calendar/calendar-section";
import TaskDropzone from "@/components/tasks/task-dropzone";

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <TaskDropzone />
      <AnalyticsSection />
      <CalendarSection />
    </div>
  );
}
