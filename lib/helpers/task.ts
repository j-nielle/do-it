import { getLocalTimeZone, today } from "@internationalized/date";
import { Timestamp } from "firebase/firestore";

import { getDateRange } from "./date";

import { TaskStatus as TS } from "@/lib/constants/task";
import { Task } from "@/types/task";

export const getTaskInput = (task: Task) => {
  let planned = null;
  let actual = null;

  const { status } = task;

  switch (status) {
    case TS.TODO:
      planned = task.planned
        ? getDateRange(task.planned)
        : getDateRange({ start: Timestamp.now(), end: Timestamp.now() });
      break;
    case TS.IN_PROGRESS:
    case TS.COMPLETED:
      planned = task.planned ? getDateRange(task.planned) : null;
      actual = task.actual
        ? getDateRange(task.actual)
        : getDateRange({ start: Timestamp.now(), end: Timestamp.now() });
      break;
    default:
      break;
  }

  return {
    title: task?.title,
    category: task?.category,
    status: task?.status,
    planned,
    actual,
    progress: task?.progress,
    statusHistory: task?.statusHistory,
  };
};

export const getProgress = (status: TS) => {
  return status === TS.IN_PROGRESS ? 50 : status === TS.COMPLETED ? 100 : 0;
};

export const getDateRangeLabel = (status: TS) => {
  return status === TS.IN_PROGRESS
    ? "Actual Duration"
    : status === TS.TODO
      ? "Planned Duration"
      : "Task Duration";
};

export const getDateRangeMaxValue = (status: TS) => {
  return status === TS.IN_PROGRESS || status === TS.COMPLETED
    ? today(getLocalTimeZone())
    : null;
};
