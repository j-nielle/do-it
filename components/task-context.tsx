"use client";
import React, { useEffect, useState } from "react";

import { TaskContext } from "@/contexts/taskContext";
import { getTasks, onTasksUpdate } from "@/services/tasks";
import { Task } from "@/types/task";
import { ChartDataContext } from "@/types/chart";
import { ChartContext } from "@/contexts/chartContext";

export default function TaskContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selected, setSelected] = useState<Task | null>(null);
  const [chartContext, setChartContext] = useState<ChartDataContext>({
    tasks: [],
  });

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

  useEffect(() => {
    if (tasks) {
      setChartContext({ tasks });
      // console.log(tasks);
    }
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, selected, setSelected }}>
      <ChartContext.Provider value={{ chartContext, setChartContext }}>
        {children}
      </ChartContext.Provider>
    </TaskContext.Provider>
  );
}
