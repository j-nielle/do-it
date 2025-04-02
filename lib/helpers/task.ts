import { getLocalTimeZone, today } from "@internationalized/date";
import { Timestamp } from "firebase/firestore";

import { getDateRange } from "./date";

import { TaskStatus as TS } from "@/lib/constants/task";
import { ActualDuration, Task, TaskDuration } from "@/types/task";

export const getTaskInput = (task: Task) => {
  return {
    title: task?.title,
    category: task?.category,
    status: task?.status,
    planned: getDateRange(task.planned),
    actual: getDateRange(task.actual),
    progress: task?.progress,
    statusHistory: task?.statusHistory,
  };
};

export const updateTaskDuration = (
  newStatus: TS,
  prevStatus: TS,
  plannedDuration: TaskDuration | null,
  actualDuration: ActualDuration | null,
) => {
  const now = Timestamp.now();

  // Reset case: Moving to TODO or BACKLOG
  if (
    (newStatus === TS.TODO && prevStatus !== TS.TODO) ||
    (newStatus === TS.BACKLOG && prevStatus !== TS.BACKLOG)
  ) {
    return { planned: plannedDuration, actual: null };
  }

  // Starting work: Transition to IN_PROGRESS
  if (newStatus === TS.IN_PROGRESS && prevStatus !== TS.IN_PROGRESS) {
    return {
      planned: plannedDuration,
      actual: { start: now, end: null, duration: 0 },
    };
  }

  // Completing task: Transition to COMPLETED
  if (newStatus === TS.COMPLETED && prevStatus !== TS.COMPLETED) {
    const startTime = actualDuration?.start || now;
    const duration = now.seconds - startTime.seconds;

    return {
      planned: plannedDuration,
      actual: { start: startTime, end: now, duration },
    };
  }

  // Reverting from COMPLETED
  if (prevStatus === TS.COMPLETED && newStatus !== TS.COMPLETED) {
    return {
      planned: plannedDuration,
      actual: actualDuration
        ? { ...actualDuration, end: null, duration: 0 }
        : { start: now, end: null, duration: 0 },
    };
  }

  return { planned: plannedDuration, actual: actualDuration };
};

export const getProgress = (status: TS) => {
  return status === TS.IN_PROGRESS ? 50 : status === TS.COMPLETED ? 100 : 0;
};

export const getDateRangeMaxValue = (status: TS) => {
  return status === TS.IN_PROGRESS || status === TS.COMPLETED
    ? today(getLocalTimeZone())
    : null;
};
