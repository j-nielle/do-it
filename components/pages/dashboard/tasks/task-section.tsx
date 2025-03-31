import React from "react";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";

import { TaskBacklog } from "./task-backlog";
import TaskButtonGroup from "./task-button-group";
import TaskDeleteZone from "./task-delete-zone";

import { TaskStatus } from "@/lib/constants/task";
import { Task } from "@/types/task";

export default function TaskSection({ tasks }: { tasks: Task[] }) {
  return (
    <section className="col-span-2 lg:col-span-1 gap-2">
      <div className="flex flex-col gap-2 h-full">
        <TaskDeleteZone />
        <Card className="h-full" radius="sm">
          <TaskButtonGroup />
          <Divider />
          <TaskBacklog id={TaskStatus.BACKLOG} tasks={tasks} />
        </Card>
      </div>
    </section>
  );
}
