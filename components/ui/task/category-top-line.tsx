import clsx from "clsx";
import { useTheme } from "next-themes";

import { TaskCategory as TC } from "@/lib/constants/task";

export default function CategoryTopLine({ category }: { category: TC }) {
  const { theme } = useTheme();

  return (
    <div
      className={clsx("h-1.5 w-full", {
        "bg-green-500": category === TC.HEALTH,
        "bg-blue-500": category === TC.WORK,
        "bg-purple-500": category === TC.LEARNING,
        "bg-rose-500": category === TC.FINANCE,
        "bg-amber-500": category === TC.SOCIAL,
        "bg-white": category === TC.UNCATEGORIZED && theme === "dark",
        "bg-black": category === TC.UNCATEGORIZED && theme === "light",
      })}
    />
  );
}
