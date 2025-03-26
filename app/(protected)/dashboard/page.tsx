import React from "react";
import TaskSection from "@/components/tasks/section";
import AnalyticsSection from "@/components/analytics/section";
import CalendarSection from "@/components/calendar/section";
import BoardSection from "@/components/board/section";

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <TaskSection />
      <BoardSection />
      <CalendarSection />
      <AnalyticsSection />
    </div>
  );
}
