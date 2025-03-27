"use client";

import React, { useEffect, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { Task, TaskContainer } from "@/types/task";
import { getTasks, onTasksUpdate } from "@/services/tasks";
import { TaskStatus } from "@/lib/constants";
import TaskSection from "@/components/tasks/task-section";
import BoardSection from "@/components/board/board-section";

export default function TaskDropzone() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [containers, setContainers] = useState<TaskContainer>({
    BACKLOG: [],
    TODO: [],
    PENDING: [],
    COMPLETED: [],
  });

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    onTasksUpdate(setTasks);
  }, []);

  useEffect(() => {
    setContainers({
      BACKLOG: tasks.filter(({ status }) => status === TaskStatus.BACKLOG),
      TODO: tasks.filter(({ status }) => status === TaskStatus.TODO),
      PENDING: tasks.filter(({ status }) => status === TaskStatus.PENDING),
      COMPLETED: tasks.filter(({ status }) => status === TaskStatus.COMPLETED),
    });
  }, [tasks]);

  const loadTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

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
