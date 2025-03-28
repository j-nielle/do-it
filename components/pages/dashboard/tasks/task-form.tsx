"use client";

import React, { useState } from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { DateRangePicker } from "@heroui/date-picker";
import { Select, SelectItem } from "@heroui/select";
import { SharedSelection } from "@heroui/system";
import {
  IconBooks,
  IconBrandGoogleFit,
  IconBriefcase,
  IconHourglassHigh,
  IconCoin,
  IconGlassChampagne,
  IconPin,
  IconQuestionMark,
  IconCheckbox,
  IconArchive,
} from "@tabler/icons-react";
import { TaskCategory, TaskStatus } from "@/lib/constants";
import { addTask } from "@/services/tasks";
import { TaskInputFields } from "@/types/task";
import { DateRange } from "@/types/date";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import { getLocalTimeZone, today } from "@internationalized/date";

export default function TaskForm({ onClose }: { onClose: () => void }) {
  const [values, setValues] = useState<TaskInputFields>({
    title: "",
    category: "",
    duration: {
      planned: {
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()),
      },
      actual: null,
    },
    statusHistory: [],
  });

  const handleSelectStatus = (keys: SharedSelection) => {
    const selectedValue = Array.from(keys)[0] as TaskStatus;
    setValues((prev) => ({
      ...prev,
      statusHistory: [
        ...(prev.statusHistory || []),
        { status: selectedValue, timestamp: Timestamp.now() },
      ],
    }));
  };

  const handleSelectCategory = (keys: SharedSelection) => {
    const selectedValue = Array.from(keys)[0] as string;
    setValues((prev) => ({ ...prev, category: selectedValue }));
  };

  const handleSelectDateRange = (value: DateRange) => {
    if (!value || !value.start || !value.end) {
      console.warn("Date range is incomplete or null");
      return;
    }

    setValues((prev) => ({
      ...prev,
      duration: {
        planned: value,
        actual: null,
      },
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
        label="Task Category"
        aria-label="Task Category"
        placeholder="Select category"
        onSelectionChange={handleSelectCategory}
      >
        <SelectItem
          key={TaskCategory.HEALTH}
          startContent={<IconBrandGoogleFit size={12} />}
        >
          Health
        </SelectItem>
        <SelectItem
          key={TaskCategory.WORK}
          startContent={<IconBriefcase size={12} />}
        >
          Work
        </SelectItem>
        <SelectItem
          key={TaskCategory.LEARNING}
          startContent={<IconBooks size={12} />}
        >
          Learning
        </SelectItem>
        <SelectItem
          key={TaskCategory.FINANCE}
          startContent={<IconCoin size={12} />}
        >
          Finance
        </SelectItem>
        <SelectItem
          key={TaskCategory.SOCIAL}
          startContent={<IconGlassChampagne size={12} />}
        >
          Social
        </SelectItem>
        <SelectItem
          key={TaskCategory.UNCATEGORIZED}
          startContent={<IconQuestionMark size={12} />}
        >
          Uncategorized
        </SelectItem>
      </Select>
      <Select
        isRequired
        label="Task Status"
        aria-label="Task Status"
        placeholder="Select status"
        onSelectionChange={handleSelectStatus}
      >
        <SelectItem
          key={TaskStatus.BACKLOG}
          startContent={<IconArchive size={12} />}
        >
          Backlog
        </SelectItem>
        <SelectItem key={TaskStatus.TODO} startContent={<IconPin size={12} />}>
          To Do
        </SelectItem>
        <SelectItem
          key={TaskStatus.IN_PROGRESS}
          startContent={<IconHourglassHigh size={12} />}
        >
          In Progress
        </SelectItem>
        <SelectItem
          key={TaskStatus.COMPLETED}
          startContent={<IconCheckbox size={12} />}
        >
          Completed
        </SelectItem>
      </Select>
      <DateRangePicker
        isRequired
        label="Task Duration"
        aria-label="Task Duration"
        value={values.duration?.planned}
        onChange={handleSelectDateRange}
      />
    </Form>
  );
}
