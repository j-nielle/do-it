"use client";
import { useRef } from "react";
import { useDisclosure, useDraggable } from "@heroui/modal";
import { IconPencil } from "@tabler/icons-react";

import TaskForm from "./task-form";

import FormModal from "@/components/modal/form-modal";
import CategoryIcon from "@/components/ui/task/category-icon";
import { Task } from "@/types/task";

interface TaskHeaderProps {
  task: Task;
  setSelected: React.Dispatch<React.SetStateAction<Task | null>>;
}

export default function TaskHeader({ task, setSelected }: TaskHeaderProps) {
  const targetRef = useRef<HTMLElement>(null!);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  const handleOpen = () => {
    setSelected(task);
    onOpen();
  };

  return (
    <>
      <div className="w-full flex flex-row justify-between gap-3 items-center">
        <button
          aria-label="Edit Task"
          className="dark:text-white"
          onClick={handleOpen}
        >
          <IconPencil size={16} />
        </button>
        <p className="max-w-[50ch] truncate font-semibold text-start text-base flex-1">
          {task.title}
        </p>
        <span>
          <CategoryIcon category={task.category} iconSize={16} />
        </span>
      </div>
      <FormModal
        ref={targetRef}
        isOpen={isOpen}
        moveprops={moveProps}
        placement="top"
        size="sm"
        title="Edit task"
        onOpenChange={onOpenChange}
      >
        <TaskForm onClose={onClose} />
      </FormModal>
    </>
  );
}
