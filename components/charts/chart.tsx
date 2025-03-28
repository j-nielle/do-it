"use client";

import { defaultHeatmapOptions, defaultHeatmapSeries } from "@/lib/constants";
import { CommonChartProps } from "@/types/chart";
import ReactApexChart from "react-apexcharts";

export default function Chart({
  options = defaultHeatmapOptions,
  series = defaultHeatmapSeries,
  dimensions,
  type = "heatmap",
}: CommonChartProps) {
  const rangeBarOptions = {
    ...options,
    dataLabels: {
      ...options.dataLabels,
      formatter: (val: number[], opts?: any) => {
        const label = opts.w.globals.labels[opts.dataPointIndex];

        // Check if val is a valid array with two elements
        if (!Array.isArray(val) || val.length < 2) {
          return ""; // Return empty or placeholder
        }

        // Convert values to numbers to handle string timestamps
        const startVal = Number(val[0]);
        const endVal = Number(val[1]);

        // Create Date objects
        const a = new Date(startVal);
        const b = new Date(endVal);

        // Check if dates are valid
        if (isNaN(a.getTime()) || isNaN(b.getTime())) {
          return "Invalid Date"; // Handle invalid dates
        }

        // Calculate day difference
        const diff = Math.round(
          (b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24),
        );

        // Format dates
        const formatter = new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
        });
        const startDate = formatter.format(a);
        const endDate = formatter.format(b);

        // Return formatted string
        return `${label}: ${startDate} - ${endDate} (${diff}d)`;
      },
    },
  };
  return (
    <ReactApexChart
      options={type === "rangeBar" ? rangeBarOptions : options}
      series={series}
      type={type}
      width={dimensions?.width}
      height={dimensions?.height}
    />
  );
}
