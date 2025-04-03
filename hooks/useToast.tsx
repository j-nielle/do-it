import { addToast } from "@heroui/toast";
import { IconBugFilled, IconCircleCheckFilled } from "@tabler/icons-react";
import { useCallback } from "react";

import { getErrorMessage } from "@/lib/helpers/error";

type ToastType = "delete" | "add" | "update" | "custom";

export const useToast = () => {
  return useCallback(
    async <T,>(
      action: Promise<T>,
      type: ToastType = "custom",
      customMessage?: string
    ) => {
      try {
        await action;

        const defaultMessages = {
          delete: "Task removed successfully",
          add: "Task added successfully!",
          update: "Task updated successfully",
          custom: customMessage || "Action completed successfully",
        };

        addToast({
          title: defaultMessages[type],
          color: "success",
          variant: "flat",
          shadow: "sm",
          severity: "success",
          icon: <IconCircleCheckFilled />,
        });
      } catch (error) {
        addToast({
          title: getErrorMessage(error),
          color: "danger",
          variant: "flat",
          shadow: "sm",
          severity: "danger",
          icon: <IconBugFilled />,
        });
      }
    },
    []
  );
};
