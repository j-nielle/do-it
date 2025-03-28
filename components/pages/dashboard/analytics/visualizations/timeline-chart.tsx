import { Chart } from "@/components/charts";
import { defaultRangeBarOptions, defaultRangeBarSeries } from "@/lib/constants";
import React from "react";

export default function TimelineChart() {
  return (
    <Chart
      type="rangeBar"
      options={defaultRangeBarOptions}
      series={defaultRangeBarSeries}
    />
  );
}
