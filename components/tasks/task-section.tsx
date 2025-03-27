import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import TaskButtonGroup from "./task-button-group";
import TaskItem from "./task-item";
import { ScrollArea } from "@/components/shadcn-ui/scroll-area";
import { TaskStatus } from "@/lib/constants";
import { Task } from "@/types/task";
import { useDroppable } from "@dnd-kit/react";

export default function TaskSection({ tasks }: { tasks: Task[] }) {
  return (
    <section className="flex flex-col gap-2 max-h-[346px]">
      <p className="font-bold text-xl">Tasks Section</p>
      <Card className="h-full" radius="sm">
        <TaskButtonGroup />
        <Divider />
        <BacklogColumn tasks={tasks} id={TaskStatus.BACKLOG} />
      </Card>
    </section>
  );
}

interface BacklogColumnProps {
  tasks: Task[];
  id: string;
}

const BacklogColumn = ({ tasks, id }: BacklogColumnProps) => {
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
            containerId={TaskStatus.BACKLOG}>
            {task.title}
          </TaskItem>
        ))}
      </CardBody>
    </ScrollArea>
  );
};
