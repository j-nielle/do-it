import React from "react";
import { useDroppable } from "@dnd-kit/react";
import { Card, CardBody } from "@heroui/card";
import clsx from "clsx";

export default function BoardColumn({
  id,
  children,
  className,
}: {
  id: string;
  children?: React.ReactNode;
  className?: string;
}) {
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
    <Card aria-labelledby={id}
      ref={ref}
      className={clsx("min-h-32 transition-colors", className)}
      radius="sm"
      shadow="sm"
    >
      <CardBody className="flex flex-col gap-2">{children}</CardBody>
    </Card>
  );
}
