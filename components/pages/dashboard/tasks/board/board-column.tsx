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
  });
  return (
    <Card
      ref={ref}
      shadow="sm"
      radius="sm"
      className={clsx("min-h-32 transition-colors", className)}
    >
      <CardBody className="flex flex-col gap-2">{children}</CardBody>
    </Card>
  );
}
