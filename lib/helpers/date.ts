import { DateValue } from "@react-types/datepicker";
import { Timestamp } from "firebase/firestore";

export const convertToTimestamp = (
  dateValue: DateValue,
  timeZone: string = "UTC",
): Timestamp => {
  const date = new Date(dateValue.year, dateValue.month - 1, dateValue.day);
  return Timestamp.fromDate(date);
};
