"use client";

import { useDroppable } from "@dnd-kit/react";
import { Card, CardBody } from "@heroui/card";

import TaskItem from "./task-item";

import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskStatus } from "@/lib/constants/task";
import { Task } from "@/types/task";

interface TaskBacklogProps {
  tasks: Task[];
  id: string;
}
export const TaskBacklog = ({ tasks, id }: TaskBacklogProps) => {
  const { ref } = useDroppable({
    id,
  });

  return (
    <ScrollArea ref={ref} className="min-h-[324px] h-full">
      <CardBody className="flex flex-col gap-2 h-full">
        <Card
          className="bg-slate-300/55 h-full dark:bg-slate-300/25"
          radius="sm"
          shadow="sm">
          <CardBody className="gap-2">
            <div className="mb-2 font-bold">Backlog</div>
            {tasks.length > 0 &&
              tasks?.map((task, index) => (
                <TaskItem
                  id={task.id}
                  key={task.id}
                  task={task}
                  index={index}
                  statusId={TS.BACKLOG}
                />
              ))}
          </CardBody>
        </Card>
      </CardBody>
    </ScrollArea>
  );
};
