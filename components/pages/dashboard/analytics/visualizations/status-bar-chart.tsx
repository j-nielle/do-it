"use client";

import { ApexOptions } from "apexcharts";
import React, { useContext, useMemo } from "react";
import { Chart } from "@/components/charts";
import { TaskContext } from "@/contexts/taskContext";
import { statusOrder } from "@/lib/constants";

export default function StatusBarChart() {
  const {
    chartData: { counts },
  } = useContext(TaskContext);

  const options: ApexOptions = {
    chart: {
      id: "status-count-bar",
    },
    xaxis: {
      categories: statusOrder,
    },
  };

  const series = useMemo(() => {
    return [
      {
        name: "Status Count",
        data: counts,
      },
    ] as ApexAxisChartSeries;
  }, [counts]);

  return <Chart type="bar" options={options} series={series} />;
}
