"use client";

import React, { useRef } from "react";
import { CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useDraggable,
} from "@heroui/modal";

import TaskForm from "./task-form";

export default function CreateTask() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const targetRef = useRef<HTMLElement>(null!);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  return (
    <>
      <CardHeader className="flex gap-3">
        <div className="flex flex-col md:flex-row justify-between gap-3 w-full">
          <Button fullWidth color="primary" onPress={onOpen}>
            Create a new task
          </Button>
        </div>
      </CardHeader>
      <Modal
        ref={targetRef}
        {...moveProps}
        isOpen={isOpen}
        placement="top"
        size="sm"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new task
              </ModalHeader>
              <ModalBody>
                <TaskForm onClose={onClose} />
              </ModalBody>
              <ModalFooter>
                <Button
                  fullWidth
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button fullWidth color="primary" form="taskForm" type="submit">
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
