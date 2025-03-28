import { Chart } from "@/components/charts";
import { defaultHeatmapOptions, defaultHeatmapSeries } from "@/lib/constants";
import React from "react";

export default function Heatmap() {
  return (
    <Chart
      type="heatmap"
      options={defaultHeatmapOptions}
      series={defaultHeatmapSeries}
    />
  );
}
