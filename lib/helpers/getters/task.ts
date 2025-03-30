import { DateRange } from "@react-types/datepicker";
import { getLocalTimeZone, today } from "@internationalized/date";
import { TaskStatus as TS } from "@/lib/constants/task";

export const getProgress = (status: TS) => {
  return status === TS.IN_PROGRESS ? 50 : status === TS.COMPLETED ? 100 : 0;
};

export const getDateRangeLabel = (status: TS) => {
  return status === TS.IN_PROGRESS
    ? "Actual Duration"
    : status === TS.TODO
      ? "Planned Duration"
      : "Task Duration";
};

export const isTaskPlanned = (
  status: TS,
  actual: DateRange | null,
  planned: DateRange | null,
) => {
  return status === TS.IN_PROGRESS || status === TS.COMPLETED
    ? actual
    : planned;
};

export const getDateRangeMaxValue = (status: TS) => {
  return status === TS.IN_PROGRESS || status === TS.COMPLETED
    ? today(getLocalTimeZone())
    : null;
};
