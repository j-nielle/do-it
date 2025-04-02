import { DateValue } from "@react-types/datepicker";
import { differenceInDays } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { CalendarDate, parseDate } from "@internationalized/date";

import { WEEK_DAYS } from "@/lib/constants/date";
import { TaskDuration } from "@/types/task";
import { DateRange } from "@/types/date";

export const getTimestamp = (dateValue: DateValue) => {
  if (!dateValue) return null;

  const date = new Date(dateValue.year, dateValue.month - 1, dateValue.day);

  return Timestamp.fromDate(date);
};

export const getDateString = (timestamp: Timestamp) => {
  if (!timestamp) return;

  const newDate = new Date(
    timestamp.toDate().toLocaleString("en-US", { timeZone: "Asia/Manila" }),
  );
  const month = newDate.getMonth();
  const day = newDate.getDay();
  const year = newDate.getFullYear();

  const { isToday, isYesterday } = checkDateStatus(timestamp);

  if (isToday) {
    return "Today";
  } else if (isYesterday) {
    return "Yesterday";
  }
  if (year === new Date().getFullYear()) {
    return newDate.toLocaleDateString("en-us", {
      month: "short",
      day: "2-digit",
    } as Intl.DateTimeFormatOptions);
  } else {
    return `${month}/${day}/${year}`;
  }
};

export const getWeekday = (seconds: number) => {
  const date = new Date(seconds * 1000);

  return WEEK_DAYS[date.getDay()];
};

export const getDifference = (
  end: DateValue | Date,
  start: DateValue | Date,
) => {
  if (!end && !start) {
    throw new Error("Both start and end dates must be provided.");
  }

  const endDate = end instanceof Date ? end : end.toDate?.("Asia/Manila");
  const startDate =
    start instanceof Date ? start : start.toDate?.("Asia/Manila");

  if (!(endDate instanceof Date) || !(startDate instanceof Date)) {
    throw new Error("Invalid date conversion.");
  }

  return differenceInDays(endDate, startDate);
};

export const checkDateStatus = (timestamp: Timestamp) => {
  if (!timestamp) return { isToday: false, isYesterday: false };

  const date = new Date(timestamp.toDate().getTime());
  const now = new Date();

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formatToParts = (d: Date) => {
    const parts = formatter.formatToParts(d);
    const obj: { [key: string]: string } = {};

    parts.forEach((part) => (obj[part.type] = part.value));

    return obj;
  };

  const manilaDate = formatToParts(date);
  const manilaToday = formatToParts(now);

  const yesterday = new Date(now);

  yesterday.setDate(yesterday.getDate() - 1);
  const manilaYesterday = formatToParts(yesterday);

  const isToday =
    manilaDate.year === manilaToday.year &&
    manilaDate.month === manilaToday.month &&
    manilaDate.day === manilaToday.day;

  const isYesterday =
    manilaDate.year === manilaYesterday.year &&
    manilaDate.month === manilaYesterday.month &&
    manilaDate.day === manilaYesterday.day;

  return { isToday, isYesterday };
};

export const isSameDay = (first?: string, second?: string) => {
  if (!first || !second) return;

  return first === second;
};

export const formatToYMD = (input: Date | number | string) => {
  if (typeof input === "string") {
    const parsed = Date.parse(input);

    if (isNaN(parsed)) throw new Error("Invalid date string");
    input = new Date(parsed);
  } else if (typeof input === "number") {
    if (input <= 0) throw new Error("Invalid timestamp");
    input = new Date(input);
  } else if (!(input instanceof Date)) {
    throw new Error("Invalid date type");
  }

  if (isNaN(input.getTime())) {
    throw new Error("Invalid date");
  }

  const year = input.getFullYear();
  const month = String(input.getMonth() + 1).padStart(2, "0");
  const day = String(input.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getParsedDate = (date: Date) => {
  return parseDate(formatToYMD(date));
};

export const getDateRange = (duration: TaskDuration | null) => {
  if (!duration) return null;

  const start = duration?.start
    ? getParsedDate(duration.start.toDate())
    : getCalendarDate();

  const end = duration?.end
    ? getParsedDate(duration.end.toDate())
    : getCalendarDate();

  return { start, end };
};

export const getDuration = (range: DateRange) => {
  if (!range) return null;

  return {
    start: getTimestamp(range.start),
    end: getTimestamp(range.end),
  };
};

function isDateValue(value: any): value is DateValue {
  if (!value || typeof value !== "object") return false;

  return (
    "year" in value &&
    "month" in value &&
    "day" in value &&
    typeof value.year === "number" &&
    typeof value.month === "number" &&
    typeof value.day === "number"
  );
}

export const getCalendarDate = () => {
  const now = new Date();

  return new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
};
