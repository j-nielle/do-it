import React from "react";
import { Card, CardBody } from "@heroui/card";

export default function AnalyticsSection() {
  return (
    <section className="sm:col-span-3 flex flex-col gap-2">
      <p className="font-bold text-xl">Analytics</p>
      <Card radius="sm">
        <CardBody>Charts here and there</CardBody>
      </Card>
    </section>
  );
}
