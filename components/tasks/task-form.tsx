"use client";

import React, { useState } from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import {
  IconClockHour3Filled,
  IconPinFilled,
  IconSquareCheckFilled,
} from "@tabler/icons-react";
import { TaskStatus } from "@/lib/constants";
import { addTask } from "@/services/tasks";
import { TaskFields } from "@/types/task";
import { SharedSelection } from "@heroui/system";

export default function TaskForm({ onClose }: { onClose: () => void }) {
  const [values, setValues] = useState<TaskFields>({
    title: "",
    status: "",
  });

  const handleSelectStatus = (keys: SharedSelection) => {
    const selectedValue = Array.from(keys)[0] as string;
    setValues((prev) => ({ ...prev, status: selectedValue }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!values.title?.trim() || !values.status?.trim()) return;
    addTask({ ...values });
    onClose();
  };
  return (
    <Form className="w-full" onSubmit={handleSubmit} id="taskForm">
      <Input
        isRequired
        type="text"
        id="title"
        label="Task Title"
        value={values.title}
        onValueChange={(value) =>
          setValues({
            title: value,
          })
        }
      />
      <Select
        isRequired
        label="Task Status"
        placeholder="Select status"
        selectedKeys={values.status ? new Set([values.status]) : new Set()}
        onSelectionChange={handleSelectStatus}>
        <SelectItem
          key={TaskStatus.TODO}
          startContent={<IconPinFilled size={12} />}>
          To Do
        </SelectItem>
        <SelectItem
          key={TaskStatus.PENDING}
          startContent={<IconClockHour3Filled size={12} />}>
          Pending
        </SelectItem>
        <SelectItem
          key={TaskStatus.COMPLETED}
          startContent={<IconSquareCheckFilled size={12} />}>
          Completed
        </SelectItem>
      </Select>
    </Form>
  );
}
