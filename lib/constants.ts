import { ActionTrigger, TaskInputFields } from "@/types/task";
import { getLocalTimeZone, today } from "@internationalized/date";
import { ApexOptions } from "apexcharts";
import { serverTimestamp, Timestamp } from "firebase/firestore";

export const ROOT_ROUTE = "/";
export const DASHBOARD_ROUTE = "/dashboard";
export const SETTINGS_ROUTE = "/settings";
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";

export const protectedRoutes = [DASHBOARD_ROUTE, SETTINGS_ROUTE];
export const authRoutes = [LOGIN_ROUTE, REGISTER_ROUTE];

export const SESSION_COOKIE_NAME = "user_session";

/** etc. */

export const now = Timestamp.now().seconds;

/** tasks-related section */

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum TaskCategory {
  HEALTH = "HEALTH",
  WORK = "WORK",
  LEARNING = "LEARNING",
  FINANCE = "FINANCE",
  SOCIAL = "SOCIAL",
  UNCATEGORIZED = "UNCATEGORIZED",
}

export const statusOrder = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.COMPLETED,
];

export const TASK_COLUMNS = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "COMPLETED", title: "Completed" },
] as const;

export const defaultTaskInput: TaskInputFields = {
  title: "",
  category: "",
  statusHistory: [],
  current_status: null,
  timeline: {
    planned: null,
    actualWorkPeriods: [],
  },
};

/** charts-related section */

// bar

export const defaultBarChartOptions: ApexOptions = {
  chart: {
    id: "basic-bar",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
};

export const defaultBarChartSeries: ApexAxisChartSeries = [
  {
    name: "series-1",
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
];

// range bar

export const rangeBarColors = ["#008FFB", "#00E396", "#775DD0", "#FEB019"];

export const defaultRangeBarSeries: ApexAxisChartSeries = [
  {
    data: [
      {
        x: "Analysis",
        y: [new Date("2019-02-27").getTime(), new Date("2019-03-04").getTime()],
        fillColor: "#008FFB",
      },
      {
        x: "Design",
        y: [new Date("2019-03-04").getTime(), new Date("2019-03-08").getTime()],
        fillColor: "#00E396",
      },
      {
        x: "Coding",
        y: [new Date("2019-03-07").getTime(), new Date("2019-03-10").getTime()],
        fillColor: "#775DD0",
      },
      {
        x: "Testing",
        y: [new Date("2019-03-08").getTime(), new Date("2019-03-12").getTime()],
        fillColor: "#FEB019",
      },
      {
        x: "Deployment",
        y: [new Date("2019-03-12").getTime(), new Date("2019-03-17").getTime()],
        fillColor: "#FF4560",
      },
    ],
  },
];

export const defaultRangeBarOptions: ApexOptions = {
  chart: { height: 350, type: "rangeBar", id: "basic-range-bar" },
  plotOptions: {
    bar: {
      horizontal: true,
      distributed: true,
      dataLabels: { hideOverflowingLabels: false },
    },
  },
  dataLabels: {
    enabled: true,
    style: { colors: ["#f3f4f5", "#fff"] },
  },
  xaxis: { type: "datetime" },
  yaxis: { show: false },
  grid: { row: { colors: ["#f3f4f5", "#fff"], opacity: 1 } },
};

// heatmap

export const defaultHeatmapSeries: ApexAxisChartSeries = [
  {
    name: "Metric 1",
    data: [
      { x: "10:00", y: 30 },
      { x: "10:30", y: 40 },
      { x: "11:00", y: 35 },
      { x: "11:30", y: 50 },
      { x: "12:00", y: 55 },
      { x: "12:30", y: 45 },
      { x: "01:00", y: 60 },
      { x: "01:30", y: 70 },
    ],
  },
  {
    name: "Metric 2",
    data: [
      { x: "10:00", y: 50 },
      { x: "10:30", y: 45 },
      { x: "11:00", y: 60 },
      { x: "11:30", y: 65 },
      { x: "12:00", y: 70 },
      { x: "12:30", y: 55 },
      { x: "01:00", y: 40 },
      { x: "01:30", y: 35 },
    ],
  },
  {
    name: "Metric 3",
    data: [
      { x: "10:00", y: 70 },
      { x: "10:30", y: 65 },
      { x: "11:00", y: 75 },
      { x: "11:30", y: 60 },
      { x: "12:00", y: 55 },
      { x: "12:30", y: 80 },
      { x: "01:00", y: 85 },
      { x: "01:30", y: 90 },
    ],
  },
];

export const defaultHeatmapOptions: ApexOptions = {
  chart: {
    height: 450,
    type: "heatmap",
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#008FFB", "#00E396", "#FEB019"],
  xaxis: {
    type: "category",
    categories: [
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "01:00",
      "01:30",
    ],
  },
  title: {
    text: "HeatMap Chart (Different color shades for each series)",
  },
  grid: {
    padding: {
      right: 20,
    },
  },
};
