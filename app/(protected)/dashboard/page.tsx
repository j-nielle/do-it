import { dashboardMetadata } from "@/config/metadata";
import Dropzone from "@/components/pages/dashboard/task/task-dropzone";

export const metadata = dashboardMetadata;

export default function Page() {
  return <Dropzone />;
}
