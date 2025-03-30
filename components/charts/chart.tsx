"use client";

import { CommonChartProps } from "@/types/chart";
import { useId } from "react";
import ReactApexChart from "react-apexcharts";

export default function Chart({
  options,
  series,
  dimensions,
  type = "heatmap",
}: CommonChartProps) {
  const id = useId();
  return (
    <ReactApexChart
      id={id}
      options={options}
      series={series}
      type={type}
      width={dimensions?.width}
      height={dimensions?.height}
    />
  );
}
