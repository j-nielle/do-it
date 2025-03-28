"use client";

import React, { useState } from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { DateRangePicker } from "@heroui/date-picker";
import { Select, SelectItem } from "@heroui/select";
import { SharedSelection } from "@heroui/system";
import {
  IconClockHour3Filled,
  IconPinFilled,
  IconSquareCheckFilled,
} from "@tabler/icons-react";
import { TaskStatus } from "@/lib/constants";
import { addTask } from "@/services/tasks";
import { TaskFields } from "@/types/task";
import { DateRange } from "@/types/date";

export default function TaskForm({ onClose }: { onClose: () => void }) {
  const [values, setValues] = useState<TaskFields>({
    title: "",
    status: "",
    category: "UNCATEGORIZED",
    dateRange: null,
  });

  const handleSelectStatus = (keys: SharedSelection) => {
    const selectedValue = Array.from(keys)[0] as string;
    setValues((prev) => ({ ...prev, status: selectedValue }));
  };

  const handleSelectDateRange = (value: DateRange) => {
    setValues((prev) => ({
      ...prev,
      dateRange: value,
    }));
  };

  const handleInput = (value: string) => {
    setValues((prev) => ({
      ...prev,
      title: value,
    }));
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
        aria-label="Task Title"
        placeholder="Enter title"
        value={values.title}
        onValueChange={handleInput}
      />
      <Select
        isRequired
        label="Task Status"
        aria-label="Task Status"
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
      <DateRangePicker
        label="Task Duration"
        aria-label="Task Duration"
        value={values.dateRange}
        onChange={handleSelectDateRange}
      />
    </Form>
  );
}
