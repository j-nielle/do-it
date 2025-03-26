import React from "react";
import Tasks from "@/components/tasks/section";
import Analytics from "@/components/analytics/section";
import Calendar from "@/components/calendar/section";

export default function Page() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Tasks />
      <Analytics />
      <Calendar />
    </div>
  );
}
