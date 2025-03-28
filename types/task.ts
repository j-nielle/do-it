import { TaskStatus } from "@/lib/constants";
import { DateRange } from "./date";
import { Timestamp } from "firebase/firestore";

export type TaskHistory = {
  status: TaskStatus;
  timestamp: Timestamp;
};

export type TaskDuration = { start: Timestamp | null; end: Timestamp | null }

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  duration: {
    planned?: TaskDuration;
    actual?: TaskDuration;
  };
  statusHistory: TaskHistory[];
}

export type TaskInputFields = {
  title: string;
  category: string;
  duration: {
    planned: DateRange;
    actual: DateRange;
  };
  statusHistory: TaskHistory[];
};


export type TaskDragData = {
  task: Task;
  type: "task";
};

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
  IN_PROGRESS: Task[];
  COMPLETED: Task[];
};