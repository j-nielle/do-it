import clsx from "clsx";

import { TaskCategory as TC } from "@/lib/constants/task";

export default function CategoryTopLine({ category }: { category: TC }) {
  return (
    <div
      className={clsx("h-1.5 w-full", {
        "bg-lime-600": category === TC.HEALTH,
        "bg-indigo-700": category === TC.WORK,
        "bg-purple-500": category === TC.LEARNING,
        "bg-rose-700": category === TC.FINANCE,
        "bg-orange-600": category === TC.SOCIAL,
        "bg-teal-600": category === TC.UNCATEGORIZED,
      })}
    />
  );
}
