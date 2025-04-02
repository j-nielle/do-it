import React from "react";
import { Tooltip } from "@heroui/tooltip";

import CategoryIcon from "./category-icon";

import { TaskCategory as TC } from "@/lib/constants/task";
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
  const chipColor = getColors(category);

  return (
    <Tooltip
      classNames={{
        content: cn({
          "bg-lime-600 text-white": category === TC.HEALTH,
          "bg-indigo-700": category === TC.WORK,
          "bg-purple-600 text-white": category === TC.LEARNING,
          "bg-rose-700": category === TC.FINANCE,
          "bg-orange-600": category === TC.SOCIAL,
          "bg-fuchsia-700": category === TC.UNCATEGORIZED,
        }),
      }}
      color={chipColor}
      content={category}
    >
      <div
        className={cn(
          "relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap h-6 text-small bg-default-100 text-success rounded-full border-2 p-1 cursor-default border-dashed opacity-75 !bg-transparent border-black",
          {
            "border-lime-600": category === TC.HEALTH,
            "border-indigo-700": category === TC.WORK,
            "border-purple-600": category === TC.LEARNING,
            "border-rose-700": category === TC.FINANCE,
            "border-orange-600": category === TC.SOCIAL,
            "border-fuchsia-700": category === TC.UNCATEGORIZED,
          },
        )}
      >
        <CategoryIcon category={category} iconSize={iconSize} />
      </div>
    </Tooltip>
  );
}
