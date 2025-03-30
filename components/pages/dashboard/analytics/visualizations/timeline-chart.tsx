"use client";

import React, { useContext, useMemo } from "react";
import { Chart } from "@/components/charts";
import { ChartContext } from "@/contexts/chartContext";
import { rangeBarOptions } from "@/lib/constants";
import { getTimeline } from "@/lib/helpers/data";

export default function TimelineChart() {
  const {
    chartContext: { tasks },
  } = useContext(ChartContext);

  const series = useMemo(() => {
    return getTimeline(tasks);
  }, [tasks]);

  return <Chart type="rangeBar" options={rangeBarOptions} series={series} />;
}
