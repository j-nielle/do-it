import React from "react";
import { Card } from "@heroui/card";
import { Calendar as UICalendar } from "@heroui/calendar";

export default function CalendarSection() {
  return (
    <section className="flex flex-col gap-2">
      <p className="font-bold text-xl">Calendar</p>{" "}
      <Card className="w-min">
        <UICalendar />
      </Card>
    </section>
  );
}
