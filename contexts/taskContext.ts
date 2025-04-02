"use client";

import { createContext } from "react";

import { TaskContextType } from "@/types/task";

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  setTasks: () => {},
  selected: null,
  setSelected: () => {},
});
