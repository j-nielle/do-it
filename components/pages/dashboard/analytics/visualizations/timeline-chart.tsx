"use client";

import React, { useContext, useMemo } from "react";

import { Chart } from "@/components/charts";
import { ChartContext } from "@/contexts/chartContext";
import { rangeBarOptions } from "@/lib/config/chart";
import { getTimeline } from "@/lib/helpers/getters/charts";

export default function TimelineChart() {
  const {
    chartContext: { tasks },
  } = useContext(ChartContext);

  const series = useMemo(() => {
    return getTimeline(tasks);
  }, [tasks]);

  return <Chart options={rangeBarOptions} series={series} type="rangeBar" />;
}
