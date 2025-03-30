"use client";

import React, { useEffect } from "react";
import { Card, CardBody } from "@heroui/card";
import { IconArrowsMove } from "@tabler/icons-react";
import { useSortable } from "@dnd-kit/react/sortable";
import { afterDragUpdate } from "@/services/tasks";
import { Task } from "@/types/task";
import { TaskStatus } from "@/lib/constants";

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
      afterDragUpdate(id, status);
    }
  }, [id, status, isDropping]);

  return (
    <Card className="cursor-grab" ref={ref} id={id} shadow="sm" radius="sm">
      <CardBody>
        <div className="flex flex-row justify-start items-center gap-x-2">
          <span
            ref={handleRef}
            className="p-1 opacity-35 active:opacity-100 *:opacity-35 *:active:opacity-100"
          >
            <IconArrowsMove size={14} />
          </span>
          {children}
        </div>
      </CardBody>
    </Card>
  );
}
