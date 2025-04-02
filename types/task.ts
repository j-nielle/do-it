import { Timestamp } from "firebase/firestore";

import { DateRange } from "./date";

import { TaskCategory, TaskStatus } from "@/lib/constants/task";

export enum ActionTrigger {
  USER_ADD = "USER_ADD",
  USER_UPDATE = "USER_UPDATE",
  USER_DRAG = "USER_DRAG",
  AUTO_SYSTEM = "AUTO_SYSTEM",
}

export type TaskHistory = {
  status: TaskStatus;
  timestamp: Timestamp;
  trigger: ActionTrigger;
};

export type TaskContextType = {
  selected: Task | null;
  setSelected: React.Dispatch<React.SetStateAction<Task | null>>;
};

export type TaskDuration = { start: Timestamp | null; end: Timestamp | null };

export type ActualDuration = TaskDuration & {
  duration?: number;
};

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  status: TaskStatus;
  planned: TaskDuration | null;
  actual: ActualDuration | null;
  progress: number;
  dependencies?: string[];
  statusHistory: TaskHistory[];
}

export type TaskInputFields = {
  title: string;
  category: string;
  status: string;
  planned: DateRange | null;
  actual: DateRange | null;
  progress: number;
  statusHistory: TaskHistory[];
};

export type TaskDragData = {
  task: Task;
  type: "task";
  selectedStatus: TaskStatus;
};

export type TaskContainer = {
  BACKLOG: Task[];
  TODO: Task[];
  IN_PROGRESS: Task[];
  COMPLETED: Task[];
};
