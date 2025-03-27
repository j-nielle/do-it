import { useDroppable } from "@dnd-kit/react";
import { CardBody } from "@heroui/card";
import { ScrollArea } from "@/components/shadcn-ui/scroll-area";
import { TaskStatus } from "@/lib/constants";
import { Task } from "@/types/task";
import TaskItem from "./task-item";

interface TaskBacklogProps {
  tasks: Task[];
  id: string;
}

export const TaskBacklog = ({ tasks, id }: TaskBacklogProps) => {
  const { ref } = useDroppable({
    id,
  });

  return (
    <ScrollArea ref={ref} className="h-[253px]">
      <CardBody className="flex flex-col gap-2">
        {tasks?.map((task, index) => (
          <TaskItem
            key={task.id}
            id={task.id}
            index={index}
            task={task}
            containerId={TaskStatus.BACKLOG}
          >
            {task.title}
          </TaskItem>
        ))}
      </CardBody>
    </ScrollArea>
  );
};
