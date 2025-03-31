import React from "react";
import { Chip } from "@heroui/chip";

import CategoryIcon from "./category-icon";

import { TaskCategory as TC } from "@/lib/constants/task";

type ChipColor =
  | "secondary"
  | "success"
  | "primary"
  | "default"
  | "warning"
  | "danger"
  | undefined;

interface CategoryChipProps {
  category: TC;
  size?: string | number;
}

export default function CategoryChip({
  category,
  size = 16,
}: CategoryChipProps) {
  function getChipColor(category: TC): ChipColor {
    switch (category) {
      case TC.HEALTH:
        return "success";
      case TC.WORK:
        return "primary";
      case TC.LEARNING:
        return "secondary";
      case TC.FINANCE:
        return "secondary";
      case TC.SOCIAL:
        return "warning";
      case TC.UNCATEGORIZED:
        return "default";
      default:
        return undefined;
    }
  }

  return (
    <Chip
      color={getChipColor(category)}
      startContent={<CategoryIcon category={category} size={size} />}
      variant="faded">
      {category}
    </Chip>
  );
}
