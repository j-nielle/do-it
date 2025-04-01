import { Divider } from "@heroui/divider";
import React from "react";

import { TaskStatus as TS } from "@/lib/constants/task";
import { ActualDuration, TaskDuration } from "@/types/task";

interface TaskCardDividerProps {
  status: TS;
  planned: ActualDuration | null;
  actual: TaskDuration | null;
}

export default function TaskCardDivider({
  status,
  planned,
  actual,
}: TaskCardDividerProps) {
  const shouldHide =
    planned === null &&
    actual === null &&
    (status === "BACKLOG" || status === "TODO");

  return !shouldHide ? <Divider /> : null;
}
