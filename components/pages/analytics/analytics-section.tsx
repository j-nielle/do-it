import React from "react";
import { Card, CardBody } from "@heroui/card";

import { Heatmap, TimelineChart } from "./charts";

export default function AnalyticsSection() {
  return (
    <section className="sm:col-span-4 flex flex-col gap-2">
      <p className="font-bold text-xl">Analytics</p>
      <Card className="" radius="sm">
        <CardBody className="grid grid-cols-1 sm:grid-cols-2">
          <Heatmap />
          <TimelineChart />
        </CardBody>
      </Card>
    </section>
  );
}
