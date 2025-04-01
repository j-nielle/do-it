import {
  IconBooks,
  IconBrandGoogleFit,
  IconBriefcase,
  IconCoin,
  IconGlassChampagne,
  IconQuestionMark,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";

import { TaskCategory as TC } from "@/lib/constants/task";

interface CategoryIconProps {
  category: TC;
  iconSize?: string | number;
}

export default function CategoryIcon({
  category,
  iconSize = 16,
}: CategoryIconProps) {
  const { theme } = useTheme();
  const icon = () => {
    switch (category) {
      case TC.HEALTH:
        return (
          <IconBrandGoogleFit className="text-green-500" size={iconSize} />
        );
      case TC.WORK:
        return <IconBriefcase className="text-blue-500" size={iconSize} />;
      case TC.LEARNING:
        return <IconBooks className="text-purple-500" size={iconSize} />;
      case TC.FINANCE:
        return <IconCoin className="text-rose-500" size={iconSize} />;
      case TC.SOCIAL:
        return (
          <IconGlassChampagne className="text-amber-500" size={iconSize} />
        );
      default:
        return (
          <IconQuestionMark
            // had to do this because doing it the normal way did not worked
            className={theme === "light" ? "text-black" : "text-white"}
            size={iconSize}
          />
        );
    }
  };

  return icon();
}
