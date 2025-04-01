import React from "react";
import { Tooltip } from "@heroui/tooltip";
import { useTheme } from "next-themes";

import CategoryIcon from "./category-icon";

import { CATEGORY_ORDER, TaskCategory as TC } from "@/lib/constants/task";
import { getCategoryColors as getColors } from "@/lib/helpers/ui";
import { cn } from "@/lib/utils";

interface CategoryChipProps {
  category: TC;
  iconSize?: string | number;
}

export default function CategoryChip({
  category,
  iconSize = 16,
}: CategoryChipProps) {
  const { theme } = useTheme();
  const chipColor = getColors(category);

  return (
    <Tooltip
      classNames={{
        content: cn({
          "bg-green-500 text-white": category === TC.HEALTH,
          "bg-blue-500": category === TC.WORK,
          "bg-purple-600 text-white": category === TC.LEARNING,
          "bg-rose-500": category === TC.FINANCE,
          "bg-amber-400": category === TC.SOCIAL,
        }),
      }}
      color={chipColor}
      content={category}
    >
      <div
        className={cn(
          "relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap h-6 text-small bg-default-100 text-success rounded-full border-2 p-1 cursor-default border-dashed opacity-75 !bg-transparent border-black",
          {
            "border-green-500": category === TC.HEALTH,
            "border-blue-500": category === TC.WORK,
            "border-purple-600": category === TC.LEARNING,
            "border-rose-500": category === TC.FINANCE,
            "border-amber-400": category === TC.SOCIAL,
            // had to do this because doing it the normal way did not worked
            "border-black":
              theme === "light" && !CATEGORY_ORDER.includes(category),
            "border-white": theme === "dark" && category === TC.UNCATEGORIZED,
          },
        )}
      >
        <CategoryIcon category={category} iconSize={iconSize} />
      </div>
    </Tooltip>
  );
}
