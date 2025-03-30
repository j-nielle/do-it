import { Task } from "@/types/task";
import { statusOrder, TaskStatus as TS } from "@/lib/constants";
import { getLocalDateString } from "./date";
import { DateRange } from "@react-types/datepicker";
import { getLocalTimeZone, today } from "@internationalized/date";

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

export const isTaskPlanned = (
  status: TS,
  actual: DateRange | null,
  planned: DateRange | null
) => {
  return status === TS.IN_PROGRESS || status === TS.COMPLETED
    ? actual
    : planned;
};

export const getDateRangeMaxValue = (status: TS) => {
  return status === TS.IN_PROGRESS || status === TS.COMPLETED
    ? today(getLocalTimeZone())
    : null;
};

export const getStatusCounts = (tasks: Task[]) => {
  const statusCounts = tasks.reduce(
    (acc, task) => {
      const statusHistory = task.statusHistory ?? [];
      const lastStatus = statusHistory.slice(-1)[0]?.status || TS.BACKLOG;
      acc[lastStatus] = (acc[lastStatus] || 0) + 1;
      return acc;
    },
    {} as Record<TS, number>
  );

  const counts = statusOrder.map((status) => statusCounts[status] || 0);

  return {
    statusCounts,
    counts,
  };
};

export const getTimeline = (tasks: Task[]) => {
  return [
    {
      name: "Planned",
      data: tasks
        .filter((t) => t.planned !== null)
        .map((t) => ({
          x: t.title,
          y: [
            getLocalDateString(t.planned?.start?.toDate() as Date),
            getLocalDateString(t.planned?.end?.toDate() as Date),
            // task.planned?.start?.toDate().getTime() ?? 0,
            // task.planned?.end?.toDate().getTime() ?? 0,
          ],
        })),
    },
    {
      name: "Actual",
      data: tasks
        .filter((t) => t.actual?.start !== null)
        .map((t) => ({
          x: t.title,
          y: [
            getLocalDateString(t.actual?.start?.toDate() as Date),
            getLocalDateString(t.actual?.end?.toDate() as Date),
            // task.actual[0].start?.toDate().getTime() ?? 0,
            // task.actual[0].end?.toDate().getTime() ?? 0,
          ],
        })),
    },
  ];
};
