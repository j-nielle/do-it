import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import TaskButtonGroup from "./button-group";
import TaskItem from "./task-item";
import { ScrollArea } from "@/components/shadcn-ui/ScrollArea";

export default function TaskSection() {
  return (
    <section className="flex flex-col gap-2 max-h-[346px]">
      <p className="font-bold text-xl">Tasks Section</p>
      <Card className="h-full">
        <TaskButtonGroup />
        <Divider />
        <ScrollArea className="h-[253px]">
          <CardBody className="flex flex-col gap-2">
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
          </CardBody>
        </ScrollArea>
      </Card>
    </section>
  );
}
