import { Task } from "@/types/task";
import { statusOrder, TaskStatus } from "@/lib/constants";

export const getStatusCounts = (tasks: Task[]) => {
  const statusCounts = tasks.reduce(
    (acc, task) => {
      const statusHistory = task.statusHistory ?? [];
      const lastStatus =
        statusHistory.slice(-1)[0]?.status || TaskStatus.BACKLOG;
      acc[lastStatus] = (acc[lastStatus] || 0) + 1;
      return acc;
    },
    {} as Record<TaskStatus, number>
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
        .filter((task) => task.timeline.planned)
        .map((task) => ({
          x: task.title,
          y: [
            task.timeline.planned?.start?.toDate().getTime() ?? 0,
            task.timeline.planned?.end?.toDate().getTime() ?? 0,
          ],
        })),
    },
    {
      name: "Actual",
      data: tasks
        .filter((task) => task.timeline.actualWorkPeriods?.length > 0)
        .map((task) => ({
          x: task.title,
          y: [
            task.timeline.actualWorkPeriods[0].start?.toDate().getTime() ?? 0,
            task.timeline.actualWorkPeriods[0].end?.toDate().getTime() ?? 0,
          ],
        })),
    },
  ];
};
