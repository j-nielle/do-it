"use client";

import { StatusCountData } from "@/types/chart";
import { createContext } from "react";

export const TaskContext = createContext<{
  chartData: StatusCountData;
  setChartData: React.Dispatch<React.SetStateAction<StatusCountData>>;
}>({
  chartData: {
    statusCounts: { BACKLOG: 0, TODO: 0, IN_PROGRESS: 0, COMPLETED: 0 },
    counts: [],
  },
  setChartData: () => {},
});
