import React from "react";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { TaskStatus } from "@/lib/constants";
import { Task } from "@/types/task";
import { TaskBacklog } from "./task-backlog";
import TaskButtonGroup from "./task-button-group";

export default function TaskSection({ tasks }: { tasks: Task[] }) {
  return (
    <section className="flex flex-col gap-2 min-h-full">
      <p className="font-bold text-xl">Tasks Section</p>
      <Card className="h-full" radius="sm">
        <TaskButtonGroup />
        <Divider />
        <TaskBacklog tasks={tasks} id={TaskStatus.BACKLOG} />
      </Card>
    </section>
  );
}
