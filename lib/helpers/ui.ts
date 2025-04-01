import { TaskCategory as TC } from "@/lib/constants/task";

export function getCategoryColors(category: TC) {
  switch (category) {
    case TC.HEALTH:
      return "success";
    case TC.WORK:
      return "primary";
    case TC.LEARNING:
      return "secondary";
    case TC.FINANCE:
      return "danger";
    case TC.SOCIAL:
      return "warning";
    default:
      return undefined;
  }
}
