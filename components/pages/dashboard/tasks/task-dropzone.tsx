"use client";

import React, { useEffect, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { Task, TaskContainer, TaskDragData } from "@/types/task";
import {
  deleteTask,
  getTasks,
  onTasksUpdate,
  updateTask,
} from "@/services/tasks";
import { TaskStatus } from "@/lib/constants";
import TaskSection from "@/components/pages/dashboard/tasks/task-section";
import BoardSection from "@/components/pages/dashboard/tasks/board/board-section";

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

  const handleDropEnd = (event: any) => {
    const { source, target } = event.operation;
    const { data } = source as { data: TaskDragData };
    if (data && "task" in data) {
      const { task } = data;
      if (target && target.id === "TRASH_ZONE") {
        deleteTask(task.id);
      }
    }
  };

  return (
    <DragDropProvider onDragOver={handleDragOver} onDragEnd={handleDropEnd}>
      <TaskSection tasks={containers.BACKLOG} />
      <BoardSection tasks={containers} />
    </DragDropProvider>
  );
}
