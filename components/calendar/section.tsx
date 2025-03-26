import React from "react";
import { Card } from "@heroui/card";
import { Calendar as UICalendar } from "@heroui/calendar";

export default function CalendarSection() {
  return (
    <section className="sm:col-span-1 flex flex-col gap-2">
      <p className="font-bold text-xl">Calendar</p>{" "}
      <Card className="w-min" radius="sm">
        <UICalendar />
      </Card>
    </section>
  );
}
