"use client";

import React, { useEffect } from "react";
import { Card, CardBody } from "@heroui/card";
import { useSortable } from "@dnd-kit/react/sortable";
import { updateTask } from "@/services/tasks";
import { Task } from "@/types/task";

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
  task?: Task;
}) {
  const { ref, sortable, isDropping } = useSortable({
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

  const status = sortable.group as string;

  useEffect(() => {
    if (isDropping && id && status !== undefined) {
      updateTask(id, { status });
    }
  }, [id, status, isDropping]);

  return (
    <Card
      className="z-20 cursor-grab"
      ref={ref}
      id={id}
      shadow="sm"
      radius="sm">
      <CardBody>{children}</CardBody>
    </Card>
  );
}
