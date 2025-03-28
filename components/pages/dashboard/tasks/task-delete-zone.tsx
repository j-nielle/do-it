import { useDroppable } from "@dnd-kit/react";
import { Button } from "@heroui/button";
import { IconTrash } from "@tabler/icons-react";

export default function TaskDeleteZone() {
  const { ref } = useDroppable({
    id: "TRASH_ZONE",
  });
  
  return (
    <Button ref={ref} isIconOnly variant="faded">
      <IconTrash size={16} />
    </Button>
  );
}
