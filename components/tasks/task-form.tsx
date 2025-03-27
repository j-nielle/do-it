"use client";

import React from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import {
  IconClockHour3Filled,
  IconPinFilled,
  IconSquareCheckFilled,
} from "@tabler/icons-react";
import { TaskStatus } from "@/lib/constants";

export default function TaskForm() {
  return (
    <Form className="w-full">
      <Input isRequired type="text" id="title" label="Task Title" />
      <Input isRequired type="text" id="description" label="Task Description" />
      <Select isRequired label="Task Status" placeholder="Select status">
        <SelectItem
          key={TaskStatus.TODO}
          startContent={<IconPinFilled size={12} />}
        >
          To Do
        </SelectItem>
        <SelectItem
          key={TaskStatus.PENDING}
          startContent={<IconClockHour3Filled size={12} />}
        >
          Pending
        </SelectItem>
        <SelectItem
          key={TaskStatus.COMPLETED}
          startContent={<IconSquareCheckFilled size={12} />}
        >
          Completed
        </SelectItem>
      </Select>
    </Form>
  );
}
