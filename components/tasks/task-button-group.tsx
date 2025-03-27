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
import { IconTrash } from "@tabler/icons-react";
import TaskForm from "./task-form";

export default function TaskButtonGroup() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const targetRef = useRef<HTMLElement>(null!);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  return (
    <>
      <CardHeader className="flex gap-3">
        <div className="flex flex-row justify-between gap-3 w-full">
          <Button color="primary" fullWidth onPress={onOpen}>
            Add new task
          </Button>
          <Button isIconOnly variant="faded">
            <IconTrash size={16} />
          </Button>
        </div>
      </CardHeader>
      <Modal
        ref={targetRef}
        {...moveProps}
        size="sm"
        isOpen={isOpen}
        placement="top"
        onOpenChange={onOpenChange}>
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
                  onPress={onClose}>
                  Cancel
                </Button>
                <Button type="submit" fullWidth color="primary" form="taskForm">
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
