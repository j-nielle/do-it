"use client";

import React, { useEffect, useMemo } from "react";
import { Card, CardBody } from "@heroui/card";
import { useSortable } from "@dnd-kit/react/sortable";
import { updateTask } from "@/services/tasks";

export default function TaskItem({
  id,
  index,
  containerId,
  children,
}: {
  id: string;
  index: number;
  containerId: string;
  children?: React.ReactNode;
}) {
  const { ref, sortable } = useSortable({
    id,
    index,
    group: containerId,
    type: "item",
    accept: ["item"],
  });

  const status = sortable.group as string;

  useEffect(() => {
    if (id && status !== undefined) {
      updateTask(id, { status });
    }
  }, [id, status]);

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
