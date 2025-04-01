"use client";

import { useDroppable } from "@dnd-kit/react";
import { Card, CardBody } from "@heroui/card";

import TaskItem from "./task-item";

import { TaskStatus as TS } from "@/lib/constants/task";
import { Task } from "@/types/task";

interface BacklogZoneProps {
  tasks: Task[];
  id: string;
}
export const BacklogZone = ({ tasks, id }: BacklogZoneProps) => {
  const { ref } = useDroppable({
    id,
  });

  return (
    // <div>
    <CardBody>
      <Card
        ref={ref}
        className="!min-h-[324px] bg-slate-300/55 h-full dark:bg-slate-300/25"
        radius="sm"
        shadow="sm"
      >
        <CardBody className="flex flex-col gap-2">
          <div className="mb-2 font-bold">Backlog</div>
          {tasks.length > 0 &&
            tasks?.map((task, index) => (
              <TaskItem
                key={task.id}
                id={task.id}
                index={index}
                statusId={TS.BACKLOG}
                task={task}
              />
            ))}
        </CardBody>
      </Card>
    </CardBody>
  );
};
