import React, { useId } from "react";
import { Card, CardBody } from "@heroui/card";

export default function TaskItem() {
  const id = useId();
  return (
    <Card id={id} shadow="sm" radius="sm">
      <CardBody>task-item</CardBody>
    </Card>
  );
}
