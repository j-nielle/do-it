"use client";

import React, { useMemo, useContext } from "react";
import { Chart } from "@/components/charts";
import {
  heatmapOptions,
  STATUS_ORDER,
  TaskStatus as TS,
} from "@/lib/constants";
import { ChartContext } from "@/contexts/chartContext";
import { weekdayCounts } from "@/lib/helpers/data";

export default function Heatmap() {
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

  return <Chart type="heatmap" options={heatmapOptions} series={series} />;
}
