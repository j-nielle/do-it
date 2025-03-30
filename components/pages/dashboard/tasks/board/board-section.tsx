import React from "react";
import { Card, CardBody } from "@heroui/card";

import BoardColumn from "./board-column";

import { TaskContainer } from "@/types/task";
import { TASK_COLUMNS } from "@/lib/constants/task";
import { taskColumnStyles } from "@/lib/variants/task";
import TaskItem from "@/components/pages/dashboard/tasks/task-item";

export default function BoardSection({ tasks }: { tasks: TaskContainer }) {
  return (
    <section className="sm:col-span-3 flex flex-col gap-2">
      <p className="font-bold text-xl">Kanban Board</p>
      <Card className="h-full" radius="sm">
        <CardBody>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
            {TASK_COLUMNS.map((column) => (
              <BoardColumn
                key={column.id}
                className={taskColumnStyles({ status: column.id })}
                id={column.id}
              >
                <div className="mb-2 font-bold">{column.title}</div>
                {tasks[column.id].map((task, index) => {
                  return (
                    <TaskItem
                      key={task.id}
                      containerId={column.id}
                      id={task.id}
                      index={index}
                      task={task}
                    >
                      {task.title}
                    </TaskItem>
                  );
                })}
              </BoardColumn>
            ))}
          </section>
        </CardBody>
      </Card>
    </section>
  );
}
