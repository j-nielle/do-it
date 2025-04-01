"use client";

import React, { useContext, useEffect, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

import { Task, TaskContainer, TaskDragData } from "@/types/task";
import {
  afterDragUpdate,
  deleteTask,
  getTasks,
  onTasksUpdate,
} from "@/services/tasks";
import { TaskStatus as Status } from "@/lib/constants/task";
import TaskSection from "@/components/pages/dashboard/task-section";
import BoardSection from "@/components/pages/dashboard/board-section";
import { ChartContext } from "@/contexts/chartContext";
import { useToast } from "@/hooks/useToast";
import { TaskContext } from "@/contexts/taskContext";

export default function Dropzone() {
  const toast = useToast();
  const { setChartContext } = useContext(ChartContext);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [containers, setContainers] = useState<TaskContainer>({
    BACKLOG: [],
    TODO: [],
    IN_PROGRESS: [],
    COMPLETED: [],
  });

  const [selected, setSelected] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    onTasksUpdate(setTasks);
  }, []);

  useEffect(() => {
    if (tasks) {
      setChartContext({ tasks });
      // console.log(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    setContainers({
      BACKLOG: tasks.filter(
        ({ statusHistory: sh }) => sh[sh.length - 1].status === Status.BACKLOG,
      ),
      TODO: tasks.filter(
        ({ statusHistory: sh }) => sh[sh.length - 1].status === Status.TODO,
      ),
      IN_PROGRESS: tasks.filter(
        ({ statusHistory: sh }) =>
          sh[sh.length - 1].status === Status.IN_PROGRESS,
      ),
      COMPLETED: tasks.filter(
        ({ statusHistory: sh }) =>
          sh[sh.length - 1].status === Status.COMPLETED,
      ),
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

    if (data && "task" in data && "selectedStatus" in data) {
      const { task, selectedStatus } = data;
      const { statusHistory: history } = task;
      const sameStatus = history[history.length - 1].status === selectedStatus;

      if (target && target.id === "TRASH_ZONE") {
        toast(deleteTask(task.id), "delete");
      }
      if (!sameStatus) {
        toast(afterDragUpdate(task.id, selectedStatus), "update");
      }
    }
  };

  return (
    <TaskContext.Provider value={{ selected, setSelected }}>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full">
        <DragDropProvider onDragEnd={handleDropEnd} onDragOver={handleDragOver}>
          <TaskSection tasks={containers.BACKLOG} />
          <BoardSection tasks={containers} />
        </DragDropProvider>
      </div>
    </TaskContext.Provider>
  );
}
