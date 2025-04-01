import { DateValue } from "@react-types/datepicker";
import { differenceInDays } from "date-fns";
import { Timestamp } from "firebase/firestore";

import { WEEK_DAYS } from "@/lib/constants/date";

export const timestamp = (dateValue: DateValue): Timestamp => {
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

  // return new Date(date.toLocaleString("en-US", { timeZone: "Asia/Manila" }))
  //   .toISOString()
  //   .split("T")[0];
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

export const hasTodayDate = (range: { start: Timestamp; end: Timestamp }) => {
  return (
    (range.start && isToday(range.start)) || (range.end && isToday(range.end))
  );
};
