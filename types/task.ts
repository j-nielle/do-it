import { TaskStatus } from "@/lib/constants";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  category?: "";
}

export type TaskCategory =
  | "Health"
  | "Work"
  | "Learning"
  | "Finance"
  | "Social";

export type TaskContainer = Record<TaskStatus, Task[]>;

export type TaskFields = {
  title?: string;
  status?: string;
};
