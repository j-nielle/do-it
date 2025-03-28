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
