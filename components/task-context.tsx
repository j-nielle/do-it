"use client";

import React, { useState } from "react";
import { TaskContext } from "@/contexts/taskContext";
import { StatusCountData } from "@/types/chart";

export default function TaskContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chartData, setChartData] = useState<StatusCountData>({
    statusCounts: { BACKLOG: 0, TODO: 0, IN_PROGRESS: 0, COMPLETED: 0 },
    counts: [],
  });
  return (
    <TaskContext.Provider value={{ chartData, setChartData }}>
      {children}
    </TaskContext.Provider>
  );
}
