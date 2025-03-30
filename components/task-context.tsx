"use client";

import React, { useState } from "react";

import { ChartContext as Context } from "@/contexts/chartContext";
import { ChartContext } from "@/types/chart";

export default function ChartContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chartContext, setChartContext] = useState<ChartContext>({
    tasks: [],
  });

  return (
    <Context.Provider value={{ chartContext, setChartContext }}>
      {children}
    </Context.Provider>
  );
}
