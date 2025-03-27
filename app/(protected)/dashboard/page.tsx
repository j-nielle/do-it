import React from "react";
import TaskSection from "@/components/tasks/task-section";
import AnalyticsSection from "@/components/analytics/analytics-section";
import CalendarSection from "@/components/calendar/calendar-section";
import BoardSection from "@/components/board/board-section";

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <TaskSection />
      <BoardSection />
      <AnalyticsSection />
      <CalendarSection />
    </div>
  );
}
