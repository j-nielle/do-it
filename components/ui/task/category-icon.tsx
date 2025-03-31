import { TaskCategory as TC } from "@/lib/constants/task";
import {
	IconBooks,
	IconBrandGoogleFit,
	IconBriefcase,
	IconCoin,
	IconGlassChampagne,
	IconQuestionMark,
} from "@tabler/icons-react";

interface CategoryIconProps {
	category: TC;
	size?: string | number;
}

export default function CategoryIcon({
	category,
	size = 12,
}: CategoryIconProps) {
	const icon = () => {
		switch (category) {
			case TC.HEALTH:
				return <IconBrandGoogleFit size={size} />;
			case TC.WORK:
				return <IconBriefcase size={size} />;
			case TC.LEARNING:
				return <IconBooks size={size} />;
			case TC.FINANCE:
				return <IconCoin size={size} />;
			case TC.SOCIAL:
				return <IconGlassChampagne size={size} />;
			default:
				return <IconQuestionMark size={size} />;
		}
	};

	return icon();
}
