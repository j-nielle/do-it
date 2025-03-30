import { Task } from "@/types/task";
import { STATUS_ORDER, TaskStatus as TS, WEEK_DAYS } from "@/lib/constants";
import { getWeekday } from "./date";
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

export const weekdayCounts = (tasks: Task[]) => {
  const counts = tasks.reduce(
    (acc, task) => {
      if (!task.statusHistory.length) return acc;

      const lastEntry = task.statusHistory[task.statusHistory.length - 1];
      const weekday = getWeekday(lastEntry.timestamp.seconds);

      acc[weekday] = (acc[weekday] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return WEEK_DAYS.map((day) => ({
    x: day,
    y: counts[day] || 0,
  }));
};

export const getStatusCounts = (tasks: Task[]) => {
  let statusCounts = tasks.reduce(
    (acc, task) => {
      const statusHistory = task.statusHistory ?? [];
      const lastStatus = statusHistory.slice(-1)[0]?.status || TS.BACKLOG;
      acc[lastStatus] = (acc[lastStatus] || 0) + 1;
      return acc;
    },
    {} as Record<TS, number>
  );

  const counts = STATUS_ORDER.map((status) => statusCounts[status] || 0);

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
        .filter((t) => t.planned?.start && t.planned?.end)
        .map((t) => ({
          x: t.title,
          y: [
            t.planned?.start?.toDate().getTime() ?? 0,
            t.planned?.end?.toDate().getTime() ?? 0,
          ],
        })),
    },
    {
      name: "Actual",
      data: tasks
        .filter((t) => t.actual?.start && t.actual?.end)
        .map((t) => ({
          x: t.title,
          y: [
            t.actual?.start?.toDate().getTime() ?? 0,
            t.actual?.end?.toDate().getTime() ?? new Date().getTime(),
          ],
        })),
    },
  ];
};
