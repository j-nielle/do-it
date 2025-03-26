import React from "react";
import Tasks from "@/components/tasks/section";
import Analytics from "@/components/analytics/section";
import Calendar from "@/components/calendar/section";
import Board from "@/components/board/section";

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <Tasks />
      <Board />
      <Calendar />
      <Analytics />
    </div>
  );
}
