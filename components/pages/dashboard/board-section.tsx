import React from "react";
import { Card, CardBody } from "@heroui/card";

import BoardColumn from "./board/board-column";

import { TaskContainer } from "@/types/task";
import { TASK_COLUMNS, TaskStatus } from "@/lib/constants/task";
import { taskColumnStyles } from "@/lib/variants/task";
import TaskItem from "@/components/pages/dashboard/task/task-item";
import clsx from "clsx";

export default function BoardSection({ tasks }: { tasks: TaskContainer }) {
  return (
    <section className="col-span-2 lg:col-span-3 flex flex-col gap-2">
      <Card className="h-full " radius="sm">
        <CardBody>
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full" aria-labelledby="board">
            {TASK_COLUMNS.map((column) => (
              <BoardColumn
                key={column.id}
                className={clsx("", {
                  "bg-blue-500/65 dark:!bg-blue-800":
                    column.id === TaskStatus.TODO,
                  "bg-yellow-500/65 dark:!bg-yellow-800":
                    column.id === TaskStatus.IN_PROGRESS,
                  "bg-green-500/65 dark:!bg-green-800":
                    column.id === TaskStatus.COMPLETED,
                })}
                id={column.id}>
                <div className="mb-2 font-bold">{column.title}</div>
                {tasks[column.id].map((task) => {
                  return <TaskItem key={task.id} id={task.id} task={task} />;
                })}
              </BoardColumn>
            ))}
          </section>
        </CardBody>
      </Card>
    </section>
  );
}
