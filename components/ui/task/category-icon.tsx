import {
  IconBooks,
  IconBrandGoogleFit,
  IconBriefcase,
  IconCoin,
  IconGlassChampagne,
  IconQuestionMark,
} from "@tabler/icons-react";

import { TaskCategory as TC } from "@/lib/constants/task";

interface CategoryIconProps {
  category: TC;
  iconSize?: string | number;
}

export default function CategoryIcon({
  category,
  iconSize = 16,
}: CategoryIconProps) {
  const icon = () => {
    switch (category) {
      case TC.HEALTH:
        return <IconBrandGoogleFit className="text-lime-600" size={iconSize} />;
      case TC.WORK:
        return <IconBriefcase className="text-indigo-700" size={iconSize} />;
      case TC.LEARNING:
        return <IconBooks className="text-purple-500" size={iconSize} />;
      case TC.FINANCE:
        return <IconCoin className="text-rose-700" size={iconSize} />;
      case TC.SOCIAL:
        return (
          <IconGlassChampagne className="text-orange-600" size={iconSize} />
        );
      default:
        return (
          <IconQuestionMark className="text-teal-600" size={iconSize} />
        );
    }
  };

  return icon();
}
