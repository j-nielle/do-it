"use client";

import { createContext } from "react";

import { ChartContext as Context } from "@/types/chart";

export const ChartContext = createContext<{
  chartContext: Context;
  setChartContext: React.Dispatch<React.SetStateAction<Context>>;
}>({
  chartContext: {
    tasks: [],
  },
  setChartContext: () => {},
});
