import { getErrorMessage } from "@/lib/helpers/error";
import { addToast } from "@heroui/toast";
import { IconBugFilled, IconCircleCheckFilled } from "@tabler/icons-react";
import { useCallback } from "react";

type ToastType = "delete" | "add" | "update";

export const useToast = () => {
  return useCallback(async <T,>(action: Promise<T>, type: ToastType) => {
    try {
      await action;
      addToast({
        title:
          type === "delete"
            ? "Task removed successfully"
            : type === "add"
              ? "Task added successfully!"
              : "Task updated successfully",
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
  }, []);
};
