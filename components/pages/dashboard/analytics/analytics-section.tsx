import React from "react";
import { Card, CardBody } from "@heroui/card";
import {
  defaultBarChartOptions,
  defaultBarChartSeries,
  defaultHeatmapOptions,
  defaultHeatmapSeries,
  defaultRangeBarOptions,
  defaultRangeBarSeries,
} from "@/lib/constants";
import { Chart } from "@/components/charts";

export default function AnalyticsSection() {
  return (
    <section className="sm:col-span-3 flex flex-col gap-2">
      <p className="font-bold text-xl">Analytics</p>
      <Card radius="sm">
        <CardBody>
          <p>Charts here and there</p>
          <Chart
            type="bar"
            options={defaultBarChartOptions}
            series={defaultBarChartSeries}
          />
          <Chart
            type="rangeBar"
            options={defaultRangeBarOptions}
            series={defaultRangeBarSeries}
          />
          <Chart
            type="heatmap"
            options={defaultHeatmapOptions}
            series={defaultHeatmapSeries}
          />
        </CardBody>
      </Card>
    </section>
  );
}
