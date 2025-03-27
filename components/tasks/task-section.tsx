import React from "react";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";
import TaskButtonGroup from "./task-button-group";
import { TaskStatus } from "@/lib/constants";
import { Task } from "@/types/task";
import { TaskBacklog } from "./task-backlog";

export default function TaskSection({ tasks }: { tasks: Task[] }) {
  return (
    <section className="flex flex-col gap-2 max-h-[346px]">
      <p className="font-bold text-xl">Tasks Section</p>
      <Card className="h-full" radius="sm">
        <TaskButtonGroup />
        <Divider />
        <TaskBacklog tasks={tasks} id={TaskStatus.BACKLOG} />
      </Card>
    </section>
  );
}
