export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Just Do It - Task Management",
  description: "personal task manager",
  navItems: [
    {
      label: "Test",
      href: "/test",
    },
  ],
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Settings",
      href: "/settings",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    login: "/login",
    register: "/register",
  },
};
