"use client";

import React, { useMemo, useContext } from "react";
import { useTheme } from "next-themes";

import { Chart } from "@/components/charts";
import { STATUS_ORDER, TaskStatus as TS } from "@/lib/constants/task";
import { heatmapOptions, STATUS_COLORS } from "@/lib/config/chart";
import { weekdayCounts } from "@/lib/helpers/charts";
import { TaskContext } from "@/contexts/taskContext";

export default function Heatmap() {
  const { theme } = useTheme();
  const { tasks } = useContext(TaskContext);

  const series = useMemo(() => {
    return STATUS_ORDER.map((status) => {
      return {
        name: status === TS.IN_PROGRESS ? "IN PROGRESS" : status,
        data: weekdayCounts(tasks.filter((t) => t.status === status)),
      };
    });
  }, [tasks]);

  return (
    <Chart
      options={{
        ...heatmapOptions,
        chart: {
          ...heatmapOptions.chart,
          background: theme === "dark" ? "#171719" : "#fff",
        },
        theme: { mode: theme as "light" | "dark" },
        colors:
          theme === "light"
            ? STATUS_COLORS
            : ["#46474c", "#3167bf", "#b58c0e", "#1f994c"],
      }}
      series={series}
      type="heatmap"
    />
  );
}
