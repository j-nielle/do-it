import { TaskStatus } from "@/lib/constants";
import { DateRange } from "./date";
import { Timestamp } from "firebase/firestore";

export enum ActionTrigger {
  USER_ADD = "USER_ADD",
  USER_DRAG = "USER_DRAG",
  AUTO_SYSTEM = "AUTO_SYSTEM",
}

export type TaskHistory = {
  status: TaskStatus;
  timestamp: Timestamp;
  trigger?: ActionTrigger;
};

export type TaskDuration = { start: Timestamp | null; end: Timestamp | null };

export interface WorkPeriod {
  start: number;
  end: number;
  duration: number;
}

export interface TaskTimeline {
  planned?: TaskDuration;
  actualWorkPeriods: WorkPeriod[];
}

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  timeline: TaskTimeline;
  current_status?: TaskStatus;
  statusHistory: TaskHistory[];
}

export type TaskInputFields = {
  title: string;
  category: string;
  statusHistory: TaskHistory[];
  timeline: {
    planned: DateRange;
    actualWorkPeriods: WorkPeriod[];
  };
  current_status: TaskStatus | null;
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
