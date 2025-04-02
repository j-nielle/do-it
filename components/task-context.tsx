"use client";
import React, { useEffect, useState } from "react";

import { TaskContext } from "@/contexts/taskContext";
import { getTasks, onTasksUpdate } from "@/services/tasks";
import { Task } from "@/types/task";

export default function TaskContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selected, setSelected] = useState<Task | null>(null);

  const loadTasks = async () => {
    const tasks = await getTasks();

    setTasks(tasks);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    onTasksUpdate(setTasks);
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, selected, setSelected }}>
      {children}
    </TaskContext.Provider>
  );
}
