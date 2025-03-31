import { TaskStatus as TS } from "@/lib/constants/task";
import {
	IconArchive,
	IconCheckbox,
	IconHourglassHigh,
	IconPin,
} from "@tabler/icons-react";

interface StatusIconProps {
	status: TS;
	size?: string | number;
}

export default function StatusIcon({
	status,
	size = 12,
}: StatusIconProps) {
	const icon = () => {
		switch (status) {
			case TS.TODO:
				return <IconArchive size={size} />;
			case TS.IN_PROGRESS:
				return <IconPin size={size} />;
			case TS.COMPLETED:
				return <IconHourglassHigh size={size} />;
			default:
				return <IconCheckbox size={size} />;
		}
	};

	return icon();
}
