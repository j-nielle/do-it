import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import TaskButtonGroup from "./task-button-group";
import TaskItem from "./task-item";
import { ScrollArea } from "@/components/shadcn-ui/scroll-area";
import { TaskStatus } from "@/lib/constants";
import { Task } from "@/types/task";

export default function TaskSection({ tasks }: { tasks: Task[] }) {
  return (
    <section className="flex flex-col gap-2 max-h-[346px]">
      <p className="font-bold text-xl">Tasks Section</p>
      <Card className="h-full" radius="sm">
        <TaskButtonGroup />
        <Divider />
        <ScrollArea className="h-[253px]">
          <CardBody className="flex flex-col gap-2">
            {tasks?.map((task, index) => (
              <TaskItem
                key={task.id}
                id={task.id}
                index={index}
                containerId={TaskStatus.BACKLOG}>
                {task.title}
              </TaskItem>
            ))}
          </CardBody>
        </ScrollArea>
      </Card>
    </section>
  );
}
