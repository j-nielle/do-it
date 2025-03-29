"use client";

import React, { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { getLocalTimeZone, today } from "@internationalized/date";
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
} from "@/lib/constants";
import { addTask } from "@/services/tasks";
import { ActionTrigger, TaskInputFields } from "@/types/task";
import { DateRange } from "@/types/date";

export default function TaskForm({ onClose }: { onClose: () => void }) {
  const [values, setValues] = useState<TaskInputFields>(defaultTaskInput);
  const [rangeLabel, setRangeLabel] = useState("Planned Duration");

  const handleSelectStatus = (keys: SharedSelection) => {
    const value = Array.from(keys)[0] as TS;

    setRangeLabel(
      value === TS.IN_PROGRESS
        ? "Work Period"
        : value === TS.COMPLETED
          ? "Completion Period"
          : "Planned Duration"
    );

    setValues((prev) => ({
      ...prev,
      current_status: value,
      statusHistory: [
        ...(prev.statusHistory || []),
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

    const now = Date.now() / 1000;

    setValues((prev) => {
      const isBacklog = prev.current_status === TS.BACKLOG;
      const isInProgress = prev.current_status === TS.IN_PROGRESS;

      if (isBacklog) {
        return {
          ...prev,
          timeline: {
            planned: null,
            actualWorkPeriods: [],
          },
        };
      }

      const prevTimeline = prev.timeline || {};
      const prevPeriods = prevTimeline.actualWorkPeriods || [];

      const start = value.start.toDate("Asia/Manila").getTime() / 1000;
      const end = value.end.toDate("Asia/Manila").getTime() / 1000;

      let updatedPeriods = [...prevPeriods];

      if (isInProgress) {
        if (
          updatedPeriods.length === 0 ||
          updatedPeriods[updatedPeriods.length - 1].end
        ) {
          updatedPeriods.push({ start: now, end: 0, duration: 0 });
        }
      } else {
        updatedPeriods.push({
          start,
          end,
          duration: end - start,
        });
      }

      return {
        ...prev,
        timeline: {
          planned: value,
          actualWorkPeriods: updatedPeriods,
        },
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
        label="Task Status"
        aria-label="Task Status"
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
      {values.current_status !== TS.BACKLOG && (
        <DateRangePicker
          isRequired
          label={rangeLabel}
          aria-label="Task Duration"
          value={values.timeline.planned}
          minValue={
            values.current_status === TS.TODO ? today(getLocalTimeZone()) : null
          }
          maxValue={
            values.current_status === TS.COMPLETED ||
            values.current_status === TS.IN_PROGRESS
              ? today(getLocalTimeZone())
              : null
          }
          onChange={handleSelectDateRange}
        />
      )}
    </Form>
  );
}
