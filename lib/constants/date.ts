import { getCalendarDate } from "../helpers/date";

export const WEEK_DAYS = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

export const defaultDuration = () => {
  return {
    start: getCalendarDate(),
    end: getCalendarDate(),
  };
};
