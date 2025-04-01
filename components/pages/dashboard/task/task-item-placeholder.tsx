import { useId } from "react";
import { CardBody } from "@heroui/card";

export const TaskItemPlaceholder = () => {
  const id = useId();

  return (
    <div
      className="cursor-grab bg-transparent rounded-lg border-1 border-slate-600/65 border-dashed"
      id={id}
    >
      <CardBody>
        <div className="flex flex-row justify-center items-center gap-x-2 text-slate-600">
          Drag a task here
        </div>
      </CardBody>
    </div>
  );
};
