import { ApexOptions } from "apexcharts";

import { Task } from "./task";

type ChartDimensions = {
  width?: string | number;
  height?: string | number;
};

type ApexChartType = "bar" | "heatmap" | "rangeBar";

export interface CommonChartProps {
  options?: ApexOptions;
  series?: ApexAxisChartSeries;
  dimensions?: ChartDimensions;
  type?: ApexChartType;
}

export interface ChartDataContext {
  tasks: Task[];
}
