import React from "react";
import { Chip } from "@heroui/chip";
import { TaskCategory as TC } from "@/lib/constants/task";

type ChipColor = "secondary" | "success" | "primary" | "default" | "warning" | "danger" | undefined

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
			startContent={<CategoryChip category={category} />}
			variant="faded">
			{category}
		</Chip>
	);
}
