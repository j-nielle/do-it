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
  defaultTaskInput,
  STATUSES,
  TaskStatus as TS,
} from "@/lib/constants/task";
import { addTask, updateTask } from "@/services/tasks";
import { ActionTrigger, TaskInputFields } from "@/types/task";
import { DateRange } from "@/types/date";
import { useToast } from "@/hooks/useToast";
import {
  getDateRangeLabel as getLabel,
  getDateRangeMaxValue as getMaxValue,
  getProgress,
  getTaskInput,
} from "@/lib/helpers/task";
import CategoryIcon from "@/components/ui/task/category-icon";
import StatusIcon from "@/components/ui/task/status-icon";
import { TaskContext } from "@/contexts/taskContext";
import { getDefaultValue } from "@/lib/helpers/date";

interface TaskFormProps {
  onClose: () => void;
}

export default function TaskForm({ onClose }: TaskFormProps) {
  const toast = useToast();
  const { selected } = useContext(TaskContext);
  const [values, setValues] = useState<TaskInputFields>(
    selected !== null ? getTaskInput(selected) : defaultTaskInput,
  );

  // useEffect(() => {
  //   if (values) console.log(values);
  // }, [values, values]);

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
      return;
    }

    setValues((prev) => {
      const isBacklog = prev.status === TS.BACKLOG;
      const isTodo = prev.status === TS.TODO;
      const isInProgress = prev.status === TS.IN_PROGRESS;
      const isCompleted = prev.status === TS.COMPLETED;

      const progress = getProgress(prev.status as TS);
      let { planned, actual } = prev;

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
    if (selected == null) {
      toast(addTask(values), "add");
    } else {
      updateTask(selected.id, values);
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
        defaultSelectedKeys={
          values.category ? new Set([values.category]) : new Set()
        }
        label="Task Category"
        placeholder="Select category"
        onSelectionChange={handleSelectCategory}
      >
        {CATEGORIES.map((category) => (
          <SelectItem
            key={category.key}
            startContent={<CategoryIcon category={category.key} />}
          >
            {category.label}
          </SelectItem>
        ))}
      </Select>
      <Select
        isRequired
        aria-label="Task Status"
        defaultSelectedKeys={
          values.status ? new Set([values.status]) : new Set()
        }
        label="Task Status"
        placeholder="Select status"
        onSelectionChange={handleSelectStatus}
      >
        {STATUSES.map((status) => (
          <SelectItem
            key={status.key}
            startContent={<StatusIcon status={status.key} />}
          >
            {status.label === "In_progress" ? "In Progress" : status.label}
          </SelectItem>
        ))}
      </Select>
      {values.status !== TS.BACKLOG && (
        <DateRangePicker
          isRequired
          aria-label="Task Duration"
          defaultValue={getDefaultValue(
            values.status as TS,
            values.planned,
            values.actual,
          )}
          label={getLabel(values.status as TS)}
          maxValue={getMaxValue(values.status as TS)}
          onChange={handleSelectDateRange}
        />
      )}
    </Form>
  );
}
