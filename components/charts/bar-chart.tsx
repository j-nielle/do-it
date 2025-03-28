'use client'

import { ApexOptions } from "apexcharts";
import React from "react";
import Chart from "react-apexcharts";

interface BarChartProps {
  options?: ApexOptions;
  series?: ApexAxisChartSeries;
}

const defaultOptions = {
  chart: {
    id: "basic-bar",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
};

const defaultSeries = [
  {
    name: "series-1",
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
];

export default function BarChart({
  options = defaultOptions,
  series = defaultSeries,
}: BarChartProps) {
  return <Chart options={options} series={series} type="bar" width="500" />;
}
