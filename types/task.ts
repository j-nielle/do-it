import { TaskStatus } from "@/lib/constants";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

export type TaskContainer = Record<TaskStatus, Task[]>;

export type UpdateTaskFields = {
  title?: string;
  status?: string;
};