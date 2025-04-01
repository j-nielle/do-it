import { IconPencil } from "@tabler/icons-react";

import CategoryIcon from "@/components/ui/task/category-icon";
import { TaskCategory } from "@/lib/constants/task";

interface TaskHeaderProps {
  title: string;
  category: TaskCategory;
}

export default function TaskHeader({ title, category }: TaskHeaderProps) {
  return (
    <div className="w-full flex flex-row justify-between gap-3 items-center">
      <button aria-label="Edit Task" className="dark:text-white">
        <IconPencil size={16} />
      </button>
      <p className="max-w-[50ch] truncate font-semibold text-start text-base flex-1">
        {title}
      </p>
      <span>
        <CategoryIcon category={category} iconSize={16} />
      </span>
    </div>
  );
}
