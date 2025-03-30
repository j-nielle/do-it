"use client";

import React, { useEffect } from "react";
import { Card, CardBody } from "@heroui/card";
import { useSortable } from "@dnd-kit/react/sortable";

import { afterDragUpdate } from "@/services/tasks";
import { Task } from "@/types/task";
import { TaskStatus } from "@/lib/constants/task";
import { useToast } from "@/hooks/useToast";
import { MoveIcon } from "@/components/icons";

export default function TaskItem({
  id,
  task,
  index,
  containerId,
  children,
}: {
  id: string;
  index: number;
  containerId: string;
  children?: React.ReactNode;
  task: Task;
}) {
  const toast = useToast();
  const { ref, sortable, isDropping, handleRef } = useSortable({
    id,
    index,
    group: containerId,
    type: "task",
    accept: ["task"],
    data: {
      type: "task",
      task: task,
    },
  });

  const status = sortable.group as TaskStatus;
  const sameStatus =
    task.statusHistory[task.statusHistory.length - 1].status === status;

  useEffect(() => {
    if (isDropping && !sameStatus) {
      toast(afterDragUpdate(id, status), "update");
    }
  }, [id, status, isDropping]);

  return (
    <Card ref={ref} className="cursor-grab" id={id} radius="sm" shadow="sm">
      <CardBody>
        <div className="flex flex-row justify-start items-center gap-x-2">
          <span
            ref={handleRef}
            className="p-1 opacity-65 active:opacity-100 *:opacity-65 *:active:opacity-100 dark:opacity-100">
            <MoveIcon size={16} className="dark:text-white h-4 w-4 rotate-45" />
          </span>
          {children}
        </div>
      </CardBody>
    </Card>
  );
}
