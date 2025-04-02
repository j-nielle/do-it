"use client";

import { createContext } from "react";

import { ChartDataContext } from "@/types/chart";

export const ChartContext = createContext<{
  chartContext: ChartDataContext;
  setChartContext: React.Dispatch<React.SetStateAction<ChartDataContext>>;
}>({
  chartContext: {
    tasks: [],
  },
  setChartContext: () => {},
});
