import { cva } from "class-variance-authority";

// had to do this because doing it the normal way did not worked
export const taskColumnStyles = cva([""], {
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