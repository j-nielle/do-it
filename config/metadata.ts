import { Metadata } from "next";

export const dashboardMetadata: Metadata = {
  metadataBase: new URL(
    "https://do-it-personal-task-manager.vercel.app/dashboard",
  ),
  title: { default: "Dashboard", template: "%s" },
  description: "dashboard",
  alternates: {
    canonical: "https://do-it-personal-task-manager.vercel.app/dashboard",
    languages: {
      "en-US": "https://example.com/en-US",
    },
  },
  openGraph: {
    title: "Do It - Dashboard",
    description: "dashboard",
    url: "https://do-it-personal-task-manager.vercel.app/dashboard",
    siteName: "Do It - Task Management | Dashboard",
  },
};
