import { addToast } from "@heroui/toast";
import { IconBugFilled, IconCircleCheckFilled } from "@tabler/icons-react";
import { useCallback } from "react";

export const useToast = <T,>() => {
  return useCallback(async (action: Promise<T>, type: string) => {
    action
      .then(() => {
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
      })
      .catch((reason) => {
        addToast({
          title: reason.toString(),
          color: "danger",
          variant: "flat",
          shadow: "sm",
          severity: "danger",
          icon: <IconBugFilled />,
        });
      });
  }, []);
};
