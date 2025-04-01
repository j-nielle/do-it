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

export const categoryLine = cva("h-1.5 w-full", {
  variants: {
    category: {
      HEALTH: ["bg-green-500"],
      WORK: ["bg-blue-500"],
      LEARNING: ["bg-purple-500"],
      FINANCE: ["bg-rose-500"],
      SOCIAL: ["bg-amber-500"],
      UNCATEGORIZED: ["bg-black dark:bg-white"],
    },
  },
  defaultVariants: {
    category: "UNCATEGORIZED",
  },
});
