"use client";

import React, { useContext, useMemo } from "react";
import { useTheme } from "next-themes";

import { Chart } from "@/components/charts";
import { ChartContext } from "@/contexts/chartContext";
import { rangeBarOptions } from "@/lib/config/chart";
import { getTimeline } from "@/lib/helpers/charts";

export default function TimelineChart() {
  const { theme } = useTheme();
  const {
    chartContext: { tasks },
  } = useContext(ChartContext);

  const series = useMemo(() => {
    return getTimeline(tasks);
  }, [tasks]);

  return (
    <Chart
      options={{
        ...rangeBarOptions,
        chart: {
          ...rangeBarOptions.chart,
          background: theme === "dark" ? "#171719" : "#fff",
        },
        theme: { mode: theme as "light" | "dark" },
      }}
      series={series}
      type="rangeBar"
    />
  );
}
