import { Divider } from "@heroui/divider";
import { IconCalendarTime, IconClockHour3 } from "@tabler/icons-react";

import { getLocalDateString as getDate } from "@/lib/helpers/date";
import { ActualDuration, TaskDuration } from "@/types/task";

interface TaskFooterProps {
  planned: ActualDuration | null;
  actual: TaskDuration | null;
}

export default function TaskFooter({ planned, actual }: TaskFooterProps) {
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
              {getDate(planned.start?.toDate()!!)} -{" "}
              <span
                className={
                  getDate(planned.end?.toDate()!!) === "Yesterday"
                    ? "text-red-500"
                    : ""
                }
              >
                {getDate(planned.end?.toDate()!!)}
              </span>
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
              {getDate(actual.start?.toDate()!!)}{" "}
              {actual.end && <>- {getDate(actual.end?.toDate()!!)}</>}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
