"use client";

import { useDroppable } from "@dnd-kit/react";
import { Card } from "@heroui/card";

export default function TaskDeleteZone() {
  const { ref } = useDroppable({
    id: "TRASH_ZONE",
  });

  return (
    <Card
      ref={ref}
      radius="sm"
      shadow="sm"
      className="bg-transparent border h-16 items-center justify-center text-red-500 border-dashed border-red-500">
      <span className="font-medium text-center">Drop here to delete</span>
    </Card>
  );
}
