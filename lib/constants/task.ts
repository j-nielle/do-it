import { TaskInputFields } from "@/types/task";

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum TaskCategory {
  HEALTH = "HEALTH",
  WORK = "WORK",
  LEARNING = "LEARNING",
  FINANCE = "FINANCE",
  SOCIAL = "SOCIAL",
  UNCATEGORIZED = "UNCATEGORIZED",
}

export const STATUS_ORDER = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.COMPLETED,
];

export const TASK_COLUMNS = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "COMPLETED", title: "Completed" },
] as const;

export const defaultTaskInput: TaskInputFields = {
  title: "",
  category: "",
  status: "",
  planned: null,
  actual: null,
  progress: 0,
  statusHistory: [],
};
