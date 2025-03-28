import { cva } from "class-variance-authority";

export const taskColumnStyles = cva(["backlog-status"], {
  variants: {
    status: {
      TODO: ["todo-status"],
      IN_PROGRESS: ["pending-status"],
      COMPLETED: ["completed-status"],
    },
  },
  defaultVariants: {
    status: "TODO",
  },
});
