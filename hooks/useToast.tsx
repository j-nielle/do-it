import { addToast } from "@heroui/toast";
import { IconBugFilled, IconCircleCheckFilled } from "@tabler/icons-react";
import { useCallback } from "react";

import { getErrorMessage } from "@/lib/helpers/error";

type ToastType = "delete" | "add" | "update";

export const useToast = () => {
  return useCallback(
    async <T,>(action: Promise<T>, type?: ToastType, message?: string) => {
      try {
        await action;
        addToast({
          title:
            type === "delete"
              ? "Task removed successfully"
              : type === "add"
                ? "Task added successfully!"
                : type === "update"
                  ? "Task updated successfully"
                  : message,
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
    [],
  );
};
