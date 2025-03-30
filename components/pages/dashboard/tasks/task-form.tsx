"use client";

import React, { useState } from "react";
import { Timestamp } from "firebase/firestore";
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

import {
  defaultTaskInput,
  TaskCategory,
  TaskStatus as TS,
} from "@/lib/constants/task";
import { addTask } from "@/services/tasks";
import { ActionTrigger, TaskInputFields } from "@/types/task";
import { DateRange } from "@/types/date";
import { useToast } from "@/hooks/useToast";
import {
  getDateRangeLabel,
  getDateRangeMaxValue,
  getProgress,
  isTaskPlanned,
} from "@/lib/helpers/getters/task";

export default function TaskForm({ onClose }: { onClose: () => void }) {
  const toast = useToast();
  const [values, setValues] = useState<TaskInputFields>(defaultTaskInput);

  const handleSelectStatus = (keys: SharedSelection) => {
    const value = Array.from(keys)[0] as TS;

    setValues((prev) => ({
      ...prev,
      status: value,
      statusHistory: [
        {
          status: value,
          timestamp: Timestamp.now(),
          trigger: ActionTrigger.USER_ADD,
        },
      ],
    }));
  };

  const handleSelectCategory = (keys: SharedSelection) => {
    const selectedValue = Array.from(keys)[0] as string;

    setValues((prev) => ({ ...prev, category: selectedValue }));
  };

  const handleSelectDateRange = (value: DateRange) => {
    if (!value?.start || !value?.end) {
      console.warn("Date range is incomplete or null");

      return;
    }

    setValues((prev) => {
      const isBacklog = prev.status === TS.BACKLOG;
      const isTodo = prev.status === TS.TODO;
      const isInProgress = prev.status === TS.IN_PROGRESS;
      const isCompleted = prev.status === TS.COMPLETED;

      const progress = getProgress(prev.status as TS);

      let planned: typeof prev.planned = null;
      let actual: typeof prev.actual = null;

      // backlog, planned (no) | actual (no) | progress = 0
      // todo, planned (yes) | actual (no) | progress = 0
      // in progress && completed, planned (no) | actual (yes)
      // in progress, progress = 50
      // completed, progress = 100

      if (isTodo) {
        actual = null;
        planned = value;
      }

      if (isBacklog) {
        return {
          ...prev,
          planned,
          actual,
        };
      } else if (isInProgress || isCompleted) {
        planned = null;
        actual = value;
      }

      return {
        ...prev,
        planned,
        actual,
        progress,
      };
    });
  };

  const handleInput = (value: string) => {
    setValues((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast(addTask(values), "add");
    onClose();
  };

  return (
    <Form className="w-full" id="taskForm" onSubmit={handleSubmit}>
      <Input
        isRequired
        aria-label="Task Title"
        id="title"
        label="Task Title"
        placeholder="Enter title"
        type="text"
        value={values.title}
        onValueChange={handleInput}
      />
      <Select
        isRequired
        aria-label="Task Category"
        label="Task Category"
        placeholder="Select category"
        onSelectionChange={handleSelectCategory}>
        <SelectItem
          key={TaskCategory.HEALTH}
          startContent={<IconBrandGoogleFit size={12} />}>
          Health
        </SelectItem>
        <SelectItem
          key={TaskCategory.WORK}
          startContent={<IconBriefcase size={12} />}>
          Work
        </SelectItem>
        <SelectItem
          key={TaskCategory.LEARNING}
          startContent={<IconBooks size={12} />}>
          Learning
        </SelectItem>
        <SelectItem
          key={TaskCategory.FINANCE}
          startContent={<IconCoin size={12} />}>
          Finance
        </SelectItem>
        <SelectItem
          key={TaskCategory.SOCIAL}
          startContent={<IconGlassChampagne size={12} />}>
          Social
        </SelectItem>
        <SelectItem
          key={TaskCategory.UNCATEGORIZED}
          startContent={<IconQuestionMark size={12} />}>
          Uncategorized
        </SelectItem>
      </Select>
      <Select
        isRequired
        aria-label="Task Status"
        label="Task Status"
        placeholder="Select status"
        onSelectionChange={handleSelectStatus}>
        <SelectItem key={TS.BACKLOG} startContent={<IconArchive size={12} />}>
          Backlog
        </SelectItem>
        <SelectItem key={TS.TODO} startContent={<IconPin size={12} />}>
          To Do
        </SelectItem>
        <SelectItem
          key={TS.IN_PROGRESS}
          startContent={<IconHourglassHigh size={12} />}>
          In Progress
        </SelectItem>
        <SelectItem
          key={TS.COMPLETED}
          startContent={<IconCheckbox size={12} />}>
          Completed
        </SelectItem>
      </Select>
      {values.status !== TS.BACKLOG && (
        <DateRangePicker
          isRequired
          aria-label="Task Duration"
          label={getDateRangeLabel(values.status as TS)}
          maxValue={getDateRangeMaxValue(values.status as TS)}
          value={isTaskPlanned(
            values.status as TS,
            values.actual,
            values.planned
          )}
          onChange={handleSelectDateRange}
        />
      )}
    </Form>
  );
}
