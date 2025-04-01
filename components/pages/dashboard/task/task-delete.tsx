"use client";

import { useDroppable } from "@dnd-kit/react";
import { Card } from "@heroui/card";

export default function DeleteZone() {
  const { ref } = useDroppable({
    id: "TRASH_ZONE",
  });

  return (
    <Card
      ref={ref}
      className="bg-transparent border h-16 items-center justify-center text-red-500 border-dashed border-red-500"
      radius="sm"
      shadow="sm"
    >
      <span className="font-medium text-center">Drop here to delete</span>
    </Card>
  );
}
