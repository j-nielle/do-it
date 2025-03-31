"use client";

import React, { useMemo, useContext } from "react";

import { Chart } from "@/components/charts";
import { STATUS_ORDER, TaskStatus as TS } from "@/lib/constants/task";
import { ChartContext } from "@/contexts/chartContext";
import { heatmapOptions, STATUS_COLORS } from "@/lib/config/chart";
import { weekdayCounts } from "@/lib/helpers/charts";
import { useTheme } from "next-themes";

export default function Heatmap() {
  const { theme } = useTheme();
  const {
    chartContext: { tasks },
  } = useContext(ChartContext);

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
          background: theme === 'dark' ? '#171719' : '#fff',
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
