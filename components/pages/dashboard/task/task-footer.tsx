import { Divider } from "@heroui/divider";
import { IconCalendarTime, IconClockHour3 } from "@tabler/icons-react";
import { Timestamp } from "firebase/firestore";

import {
  checkDateStatus,
  getDateString as getDate,
  isSameDay,
} from "@/lib/helpers/date";
import { ActualDuration, TaskDuration } from "@/types/task";

interface TaskFooterProps {
  planned: ActualDuration | null;
  actual: TaskDuration | null;
}

export default function TaskFooter({ planned, actual }: TaskFooterProps) {
  const { isYesterday } = checkDateStatus(planned?.end as Timestamp);

  return (
    <div className="flex flex-col gap-2 items-start">
      {planned && (
        <>
          <div className="flex flex-row justify-start gap-2 items-center ">
            <span>
              <IconCalendarTime size={16} />
            </span>
            <Divider orientation="vertical" />
            <p>
              {getDate(planned.start as Timestamp)}
              {!isSameDay(
                getDate(planned.start as Timestamp),
                getDate(planned.end as Timestamp),
              ) && (
                <>
                  {" "}
                  -{" "}
                  <span className={isYesterday ? "text-red-500" : ""}>
                    {getDate(planned.end as Timestamp)}
                  </span>
                </>
              )}
            </p>
          </div>
        </>
      )}
      {actual && (
        <>
          <div className="flex flex-row justify-start gap-2 items-center ">
            <span>
              <IconClockHour3 size={16} />
            </span>
            <Divider orientation="vertical" />
            <p>
              {" "}
              {getDate(actual.start as Timestamp)}{" "}
              {actual.end &&
                !isSameDay(
                  getDate(actual.start as Timestamp),
                  getDate(actual.end as Timestamp),
                ) && <>- {getDate(actual.end as Timestamp)}</>}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
