"use client";

import { useDroppable } from "@dnd-kit/react";
import { Card, CardBody } from "@heroui/card";

import TaskItem from "./task-item";

import { Task } from "@/types/task";

interface BacklogZoneProps {
  tasks: Task[];
  id: string;
}
export const BacklogZone = ({ tasks, id }: BacklogZoneProps) => {
  const { ref } = useDroppable({
    id,
    accept: ["task"],
    type: "board",
    data: {
      type: "board",
      currentBoard: id,
    },
  });

  return (
    <CardBody>
      <Card
        ref={ref}
        className="!min-h-[324px] bg-slate-300/55 h-full dark:bg-slate-300/25"
        radius="sm"
        shadow="sm">
        <CardBody className="flex flex-col gap-2">
          <div className="mb-2 font-bold">Backlog</div>
          {tasks.length > 0 &&
            tasks?.map((task, index) => (
              <TaskItem key={task.id} id={task.id} task={task} />
            ))}
        </CardBody>
      </Card>
    </CardBody>
  );
};
