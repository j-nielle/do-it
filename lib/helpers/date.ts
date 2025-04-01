import { DateValue } from "@react-types/datepicker";
import { differenceInDays } from "date-fns";
import { Timestamp } from "firebase/firestore";
import {
  CalendarDate,
  parseAbsoluteToLocal as parseToLocal,
  parseDate,
} from "@internationalized/date";

import { TaskStatus } from "../constants/task";

import { WEEK_DAYS } from "@/lib/constants/date";
import { DateRange } from "@/types/date";
import { TaskDuration } from "@/types/task";

export const toTimestamp = (dateValue: DateValue): Timestamp => {
  const date = new Date(dateValue.year, dateValue.month - 1, dateValue.day);

  return Timestamp.fromDate(date);
};

export const getLocalDateString = (date: Date) => {
  if (!date) return;

  const newDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Manila" }),
  );
  const month = newDate.getMonth();
  const day = newDate.getDay();
  const year = newDate.getFullYear();

  if (newDate === new Date()) {
    return "Today";
  } else if (isYesterday(newDate)) {
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
  if (!end || !start) {
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

export const isYesterday = (date: Date) => {
  const yesterday = new Date();

  yesterday.setDate(yesterday.getDate() - 1);

  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
};

export const isToday = (timestamp: Timestamp) => {
  if (!timestamp) return false;

  const date = new Date(timestamp.toDate().getTime());
  const today = new Date();

  const manilaDate = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const manilaToday = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(today);

  const getDateObject = (parts: Intl.DateTimeFormatPart[]) => {
    const obj: { [key: string]: string } = {};

    parts.forEach((part) => (obj[part.type] = part.value));

    return obj;
  };

  const dateObj = getDateObject(manilaDate);
  const todayObj = getDateObject(manilaToday);

  return (
    dateObj.year === todayObj.year &&
    dateObj.month === todayObj.month &&
    dateObj.day === todayObj.day
  );
};

export const isSameDay = (first?: string, second?: string) => {
  if (!first || !second) return;

  return first === second;
};

/**
 *
 * @param duration start/end from HeroUI `<DateRangePicker />`
 * @returns
 */
export const getDateRange = (
  duration: TaskDuration | null,
): DateRange | null => {
  if (!duration) {
    return null;
  }

  const start = duration?.start
    ? parseToLocal((duration.start as Timestamp).toDate().toISOString())
    : getCalendarDate();

  const end = duration?.end
    ? parseToLocal((duration?.end as Timestamp).toDate().toISOString())
    : getCalendarDate();

  return { start, end };
};

/**
 *
 * @param value start/end value from the `<DateRangePicker />` from HeroUI
 * @returns `CalendarDate` to be used for the said component
 */
export const getDateString = (value?: DateValue): CalendarDate => {
  if (value) {
    try {
      const newDate = value.toDate("Asia/Manila");
      const month = newDate.getMonth() + 1;
      const day = newDate.getDate();
      const year = newDate.getFullYear();

      const formattedMonth = String(month).padStart(2, "0");
      const formattedDay = String(day).padStart(2, "0");

      return parseDate(`${year}-${formattedMonth}-${formattedDay}`);
    } catch (error) {
      console.error("Error parsing date:", error);

      return getCalendarDate();
    }
  }

  return getCalendarDate();
};

export const getCalendarDate = (): CalendarDate => {
  const now = new Date();

  return new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
};

export const getDefaultValue = (
  status: TaskStatus,
  planned: DateRange | null,
  actual: DateRange | null,
) => {
  const duration = status === TaskStatus.TODO ? planned : actual;

  return {
    start: getDateString(duration?.start),
    end: getDateString(duration?.end),
  };
};
