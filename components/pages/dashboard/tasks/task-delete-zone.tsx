import { useDroppable } from "@dnd-kit/react";
import { Button } from "@heroui/button";
import { IconTrash } from "@tabler/icons-react";

export default function TaskDeleteZone() {
  const { ref } = useDroppable({
    id: "TRASH_ZONE",
  });

  return (
    <Button
      ref={ref}
      isIconOnly
      className="w-full md:w-fit !border-dashed !border-red-500 hover:!bg-red-500 hover:!text-white hover:!border-white"
      color="danger"
      variant="faded"
    >
      <span className="flex flex-row justify-between items-center gap-4">
        <p className="md:hidden font-medium">Drop to delete</p>
        <span className="hidden md:block">
          <IconTrash size={16} />
        </span>
      </span>
    </Button>
  );
}
