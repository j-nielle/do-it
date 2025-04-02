import { Timestamp } from "firebase/firestore";

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

export const CATEGORY_ORDER = [
  TaskCategory.HEALTH,
  TaskCategory.WORK,
  TaskCategory.LEARNING,
  TaskCategory.FINANCE,
  TaskCategory.SOCIAL,
  TaskCategory.UNCATEGORIZED,
];

export const STATUSES = [
  {
    key: TaskStatus.BACKLOG,
    label:
      TaskStatus.BACKLOG.charAt(0) + TaskStatus.BACKLOG.slice(1).toLowerCase(),
  },
  {
    key: TaskStatus.TODO,
    label: TaskStatus.TODO.charAt(0) + TaskStatus.TODO.slice(1).toLowerCase(),
  },
  {
    key: TaskStatus.IN_PROGRESS,
    label:
      TaskStatus.IN_PROGRESS.charAt(0) +
      TaskStatus.IN_PROGRESS.slice(1).toLowerCase(),
  },
  {
    key: TaskStatus.COMPLETED,
    label:
      TaskStatus.COMPLETED.charAt(0) +
      TaskStatus.COMPLETED.slice(1).toLowerCase(),
  },
];

export const CATEGORIES = [
  {
    key: TaskCategory.HEALTH,
    label:
      TaskCategory.HEALTH.charAt(0) +
      TaskCategory.HEALTH.slice(1).toLowerCase(),
  },
  {
    key: TaskCategory.WORK,
    label:
      TaskCategory.WORK.charAt(0) + TaskCategory.WORK.slice(1).toLowerCase(),
  },
  {
    key: TaskCategory.LEARNING,
    label:
      TaskCategory.LEARNING.charAt(0) +
      TaskCategory.LEARNING.slice(1).toLowerCase(),
  },
  {
    key: TaskCategory.FINANCE,
    label:
      TaskCategory.FINANCE.charAt(0) +
      TaskCategory.FINANCE.slice(1).toLowerCase(),
  },
  {
    key: TaskCategory.SOCIAL,
    label:
      TaskCategory.SOCIAL.charAt(0) +
      TaskCategory.SOCIAL.slice(1).toLowerCase(),
  },
  {
    key: TaskCategory.UNCATEGORIZED,
    label:
      TaskCategory.UNCATEGORIZED.charAt(0) +
      TaskCategory.UNCATEGORIZED.slice(1).toLowerCase(),
  },
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

export const defaultActual = {
  start: Timestamp.now(),
  end: Timestamp.now(),
  duration: 0,
};
