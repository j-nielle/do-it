"use client";

import React, { useContext, useId } from "react";
import { Card, CardBody } from "@heroui/card";
import { useDraggable } from "@dnd-kit/react";

import TaskHeader from "./task-header";
import TaskFooter from "./task-footer";
import TaskCardDivider from "./task-card-divider";

import CategoryTopLine from "@/components/ui/task/category-top-line";
import { Task } from "@/types/task";
import { TaskContext } from "@/contexts/taskContext";

interface TaskItemProps {
  id: string;
  task: Task;
  index?: number;
}

export default function TaskItem({ id, task }: TaskItemProps) {
  const elementId = useId();
  const { setSelected } = useContext(TaskContext);

  const { ref } = useDraggable({
    id,
    type: "task",
    data: {
      type: "task",
      task,
    },
  });

  return (
    <Card
      ref={ref}
      className="cursor-grab !overflow-hidden dark:!bg-gray-900"
      id={elementId}
      radius="sm"
      shadow="sm"
    >
      <CategoryTopLine category={task.category} />
      <CardBody>
        <div className="flex flex-col justify-start items-start gap-2 text-sm">
          <TaskHeader setSelected={setSelected} task={task} />
          <TaskCardDivider
            actual={task.planned}
            planned={task.planned}
            status={task.status}
          />
          <TaskFooter actual={task.actual} planned={task.planned} />
        </div>
      </CardBody>
    </Card>
  );
}
