import { useDroppable } from "@dnd-kit/react";
import { Card, CardBody } from "@heroui/card";

import TaskItem from "./task-item";

import { ScrollArea } from "@/components/shadcn-ui/scroll-area";
import { TaskStatus } from "@/lib/constants/task";
import { Task } from "@/types/task";

interface TaskBacklogProps {
  tasks: Task[];
  id: string;
}

export const TaskBacklog = ({ tasks, id }: TaskBacklogProps) => {
  const { ref } = useDroppable({
    id,
  });

  return (
    <ScrollArea ref={ref} className="min-h-[324px] h-full">
      <CardBody className="flex flex-col gap-2 h-full">
        <Card
          className="bg-slate-300/55 h-full dark:bg-slate-300/25"
          radius="sm"
          shadow="sm">
          <CardBody>
            <div className="mb-2 font-bold">Backlog</div>
            {tasks.length > 0 &&
              tasks?.map((task, index) => (
                <TaskItem
                  key={task.id}
                  containerId={TaskStatus.BACKLOG}
                  id={task.id}
                  index={index}
                  task={task}>
                  {task.title}
                </TaskItem>
              ))}
          </CardBody>
        </Card>
      </CardBody>
    </ScrollArea>
  );
};
