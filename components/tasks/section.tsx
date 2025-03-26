import React from "react";
import { Card, CardBody } from "@heroui/card";
import TaskButtonGroup from "./button-group";
import { Divider } from "@heroui/divider";

export default function Tasks() {
  return (
    <section className="flex flex-col gap-2 max-h-[346px]">
      <p className="font-bold text-xl">Tasks Section</p>
      <Card className="h-full">
        <TaskButtonGroup />
        <Divider />
        <CardBody>Task Items</CardBody>
      </Card>
    </section>
  );
}
