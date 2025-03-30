import { Timestamp } from "firebase/firestore";
import { getWeekday } from "@/lib/helpers/getters/date";
import { TaskStatus as TS } from "@/lib/constants/task";
import { Task } from "@/types/task";
import { WEEK_DAYS } from "@/lib/constants/date";

// heatmap
export const weekdayCounts = (tasks: Task[]) => {
  const counts = tasks.reduce(
    (acc, t) => {
      const isToDo = t.status === TS.TODO;
      const isInProgress = t.status === TS.IN_PROGRESS;
      const isCompleted = t.status === TS.COMPLETED;

      const end = isToDo
        ? (t.planned?.end as Timestamp).seconds
        : isInProgress || isCompleted
          ? (t.actual?.end as Timestamp).seconds
          : 0;
      const weekday = getWeekday(end);

      acc[weekday] = (acc[weekday] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return WEEK_DAYS.map((day) => ({
    x: day,
    y: counts[day] || 0,
  }));
};

// timeline
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
