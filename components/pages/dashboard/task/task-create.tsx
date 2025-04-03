"use client";

import React, { useRef } from "react";
import { CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";

import TaskForm from "./task-form";

import FormModal from "@/components/modal/form-modal";

export default function CreateTask() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const targetRef = useRef<HTMLElement>(null!);

  return (
    <>
      <CardHeader className="flex gap-3">
        <div className="flex flex-col md:flex-row justify-between gap-3 w-full">
          <Button fullWidth color="primary" onPress={onOpen}>
            Create a new task
          </Button>
        </div>
      </CardHeader>
      <FormModal
        ref={targetRef}
        isOpen={isOpen}
        placement="top"
        size="sm"
        title="Add new task"
        onOpenChange={onOpenChange}
      >
        <TaskForm onClose={onClose} />
      </FormModal>
    </>
  );
}
