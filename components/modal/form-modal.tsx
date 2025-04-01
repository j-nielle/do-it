import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { FocusableElement } from "@react-types/shared";
import React, { DOMAttributes, useContext, useEffect } from "react";

import { TaskContext } from "@/contexts/taskContext";

interface FormModalProps {
  title: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLElement | null>;
  moveprops: DOMAttributes<FocusableElement>;
  isOpen: boolean;
  placement?:
    | "center"
    | "top"
    | "auto"
    | "top-center"
    | "bottom"
    | "bottom-center";
  size?:
    | "sm"
    | "xs"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  onOpenChange?: (isOpen: boolean) => void;
}

export default function FormModal(props: FormModalProps) {
  const { setSelected } = useContext(TaskContext);

  useEffect(() => {
    if (!props.isOpen) {
      setSelected(null);
    }
  }, [props.isOpen]);

  return (
    <Modal {...props} {...props.moveprops}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {props.title}
            </ModalHeader>
            <ModalBody>{props.children}</ModalBody>
            <ModalFooter>
              <Button fullWidth color="danger" variant="flat" onPress={onClose}>
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
  );
}
