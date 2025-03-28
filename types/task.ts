import { TaskStatus } from "@/lib/constants";
import { DateRange } from "./date";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  category?: TaskCategory;
  createdAt?: string;
  updatedAt?: string;
}

export type TaskDragData = {
  task: Task;
  type: "task"
}

export type TaskCategory =
  | "HEALTH"
  | "WORK"
  | "LEARNING"
  | "FINANCE"
  | "SOCIAL"
  | "UNCATEGORIZED";

export type TaskContainer = {
  BACKLOG: Task[];
  TODO: Task[];
  PENDING: Task[];
  COMPLETED: Task[];
};

export type TaskFields = {
  title?: string;
  status?: string;
  category?: TaskCategory;
  dateRange?: DateRange;
};
