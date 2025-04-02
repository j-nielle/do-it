"use client";

import React, { useContext, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { DateRangePicker } from "@heroui/date-picker";
import { Select, SelectItem } from "@heroui/select";
import { SharedSelection } from "@heroui/system";

import {
  CATEGORIES,
  defaultTaskInput as defaultInput,
  STATUSES,
  TaskStatus as TS,
} from "@/lib/constants/task";
import { addTask, updateTask } from "@/services/tasks";
import {
  ActionTrigger as Trigger,
  TaskInputFields as Fields,
} from "@/types/task";
import { DateRange } from "@/types/date";
import { useToast } from "@/hooks/useToast";
import {
  getDateRangeMaxValue as getMaxValue,
  getProgress,
  getTaskInput as getInput,
} from "@/lib/helpers/task";
import CategoryIcon from "@/components/ui/task/category-icon";
import StatusIcon from "@/components/ui/task/status-icon";
import { TaskContext } from "@/contexts/taskContext";

interface TaskFormProps {
  onClose: () => void;
}

export default function TaskForm({ onClose }: TaskFormProps) {
  const toast = useToast();
  const { selected } = useContext(TaskContext);
  const [values, setValues] = useState<Fields>(
    selected ? getInput(selected) : defaultInput
  );

  const handleSelectStatus = (keys: SharedSelection) => {
    const status = Array.from(keys)[0] as TS;
    const trigger = selected ? Trigger.USER_UPDATE : Trigger.USER_ADD;

    setValues((prev) => ({
      ...prev,
      progress: getProgress(prev.status as TS),
      status,
      statusHistory: [
        ...(prev.statusHistory || []),
        {
          status,
          timestamp: Timestamp.now(),
          trigger,
        },
      ],
    }));
  };

  const handleSelectCategory = (keys: SharedSelection) => {
    const selectedValue = Array.from(keys)[0] as string;

    setValues((prev) => ({ ...prev, category: selectedValue }));
  };

  const handleSelectDateRange = (
    value: DateRange,
    type: "planned" | "actual" = "planned"
  ) => {
    setValues((prev) => ({
      ...prev,
      progress: getProgress(prev.status as TS),
      planned: type === "planned" ? value : prev.planned,
      actual: type === "actual" ? value : prev.actual,
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
    if (selected == null) {
      toast(addTask(values), "add");
    } else {
      toast(updateTask(selected.id, values), "update");
    }
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
        selectedKeys={values.category ? new Set([values.category]) : new Set()}
        onSelectionChange={handleSelectCategory}>
        {CATEGORIES.map((category) => (
          <SelectItem
            key={category.key}
            startContent={<CategoryIcon category={category.key} />}>
            {category.label}
          </SelectItem>
        ))}
      </Select>
      <Select
        isRequired
        aria-label="Task Status"
        label="Task Status"
        placeholder="Select status"
        selectedKeys={values.status ? new Set([values.status]) : new Set()}
        onSelectionChange={handleSelectStatus}>
        {STATUSES.map((status) => (
          <SelectItem
            key={status.key}
            startContent={<StatusIcon status={status.key} />}>
            {status.label === "In_progress" ? "In Progress" : status.label}
          </SelectItem>
        ))}
      </Select>
      <DateRangePicker
        aria-label="Planned Duration"
        isDisabled={values.status === TS.BACKLOG || !values.status}
        label="Planned Duration"
        maxValue={getMaxValue(values.status as TS)}
        value={values.planned}
        onChange={handleSelectDateRange}
      />

      <DateRangePicker
        aria-label="Actual Duration"
        isDisabled={
          values.status === TS.BACKLOG ||
          values.status === TS.TODO ||
          !values.status
        }
        isRequired={
          values.status === TS.IN_PROGRESS || values.status === TS.COMPLETED
        }
        label="Actual Duration"
        maxValue={getMaxValue(values.status as TS)}
        value={values.actual}
        onChange={(value) => handleSelectDateRange(value, "actual")}
      />
    </Form>
  );
}
