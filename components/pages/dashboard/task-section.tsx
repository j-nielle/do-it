import React from "react";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";

import { BacklogZone } from "./task/task-backlog";
import CreateTask from "./task/task-create";
import DeleteZone from "./task/task-delete";

import { TaskStatus } from "@/lib/constants/task";
import { Task } from "@/types/task";

export default function TaskSection({ tasks }: { tasks: Task[] }) {
  return (
    <section className="col-span-2 lg:col-span-1 gap-2">
      <div className="flex flex-col gap-2 h-full">
        <DeleteZone />
        <Card className="h-full" radius="sm">
          <CreateTask />
          <Divider />
          <BacklogZone id={TaskStatus.BACKLOG} tasks={tasks} />
        </Card>
      </div>
    </section>
  );
}
