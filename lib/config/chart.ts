import { ApexOptions } from "apexcharts";

export const STATUS_COLORS = ["#dde4ec", "#7eaef8", "#f2ce5e", "#6fda96"];

export const rangeBarOptions: ApexOptions = {
  chart: {
    height: 150,
    width: 250,
    type: "rangeBar",
  },
  colors: ["#90A4AE", "#E64A19"],
  plotOptions: {
    bar: {
      borderRadius: 10,
      horizontal: true,
      dataLabels: {
        total: {
          formatter: function (val) {
            return "val" + val;
          },
          enabled: true,
          style: {
            color: "#fff",
          },
          offsetX: 30,
        },
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (
      value,
      {
        seriesIndex,
        dataPointIndex,
        w: {
          config: { series },
        },
      },
    ) {
      const dataPoint = series[seriesIndex].data[dataPointIndex];
      const title = dataPoint.x;

      let start: number, end: number;

      if (Array.isArray(value)) {
        start = Number(value[0]) || 0;
        end = Number(value[1]) || 0;
      } else {
        start = 0;
        end = Number(value) || 0;
      }

      const a = new Date(start);
      const b = new Date(end);
      const diff = Math.floor(
        (b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24),
      );
      return `${title}: ${diff + (diff > 1 ? " days" : " day")}`;
    },
    style: {
      fontSize: "12px",
      colors: ["#fff"],
      fontWeight: "bold",
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.25,
      gradientToColors: undefined,
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [50, 0, 100, 100],
    },
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  legend: {
    position: "top",
  },
};

export const heatmapOptions: ApexOptions = {
  chart: {
    height: 450,
    type: "heatmap",
  },
  dataLabels: {
    enabled: false,
  },
  colors: STATUS_COLORS,
  xaxis: {
    type: "category",
  },
  grid: {
    padding: {
      right: 20,
    },
  },
  legend: {
    show: true,
    position: "top",
  },
};
