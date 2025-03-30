"use client";

import { useId } from "react";
import ReactApexChart from "react-apexcharts";

import { CommonChartProps } from "@/types/chart";

export default function Chart({
  options,
  series,
  dimensions,
  type = "heatmap",
}: CommonChartProps) {
  const id = useId();

  return (
    <ReactApexChart
      height={dimensions?.height}
      id={id}
      options={options}
      series={series}
      type={type}
      width={dimensions?.width}
    />
  );
}
