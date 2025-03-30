"use client";

import { ChartContext as Context } from "@/types/chart";
import { createContext } from "react";

export const ChartContext = createContext<{
  chartContext: Context;
  setChartContext: React.Dispatch<React.SetStateAction<Context>>;
}>({
  chartContext: {
    tasks: [],
  },
  setChartContext: () => {},
});
