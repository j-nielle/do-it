"use client";

import React, { useState } from "react";
import TaskSection from "@/components/tasks/task-section";
import BoardSection from "@/components/board/board-section";
import { TaskStatus } from "@/lib/constants";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { TaskContainer } from "@/types/task";

export default function TaskDropzone() {
  const tasks = [
    { id: "1", title: "Do dishes", status: TaskStatus.BACKLOG },
    { id: "2", title: "Code", status: TaskStatus.TODO },
    { id: "3", title: "Study", status: TaskStatus.PENDING },
    { id: "4", title: "Sleep", status: TaskStatus.COMPLETED },
  ];

  const [containers, setContainers] = useState<TaskContainer>({
    BACKLOG: tasks.filter(({ status }) => status === TaskStatus.BACKLOG),
    TODO: tasks.filter(({ status }) => status === TaskStatus.TODO),
    PENDING: tasks.filter(({ status }) => status === TaskStatus.PENDING),
    COMPLETED: tasks.filter(({ status }) => status === TaskStatus.COMPLETED),
  });

  const handleDragOver = (event: any) => {
    setContainers((items) => move(items, event));
  };

  return (
    <DragDropProvider onDragOver={handleDragOver}>
      <TaskSection tasks={containers.BACKLOG} />
      <BoardSection tasks={containers} />
    </DragDropProvider>
  );
}
