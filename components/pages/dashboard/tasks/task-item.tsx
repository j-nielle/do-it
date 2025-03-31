"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { useSortable } from "@dnd-kit/react/sortable";

import { Task } from "@/types/task";
import { getLocalDateString } from "@/lib/helpers/date";
import CategoryChip from "@/components/ui/task/category-chip";

interface TaskItemProps {
  id: string;
  task: Task;
  index: number;
  statusId: string;
}

export default function TaskItem({
  id,
  task,
  index,
  statusId: group,
}: TaskItemProps) {
  const { ref } = useSortable({
    id,
    index,
    group,
    type: "task",
    accept: ["task"],
    data: {
      type: "task",
      selectedStatus: group,
      task,
    },
  });

  return (
    <Card ref={ref} className="cursor-grab" id={id} radius="sm" shadow="sm">
      <CardBody>
        <div className="flex flex-col justify-start items-start gap-x-2 text-sm">
          <p className="flex flex-row justify-between items-center w-full">
            <span>{task.title}</span> <CategoryChip category={task.category} />
          </p>
          {task.planned && (
            <span>
              <p>
                Planned start:{" "}
                {getLocalDateString(task.planned.start?.toDate()!!)}
              </p>
              <p>
                Planned end: {getLocalDateString(task.planned.end?.toDate()!!)}
              </p>
            </span>
          )}
          {task.actual && (
            <span>
              <p>
                Actual start:{" "}
                {getLocalDateString(task.actual.start?.toDate()!!)}
              </p>
              {task.actual.end && (
                <p>
                  Actual end: {getLocalDateString(task.actual.end?.toDate())}
                </p>
              )}
            </span>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
