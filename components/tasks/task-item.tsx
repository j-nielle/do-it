"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { useSortable } from "@dnd-kit/react/sortable";

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
  const { ref } = useSortable({
    id,
    index,
    group: containerId,
    type: "item",
    accept: ["item"],
  });

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
