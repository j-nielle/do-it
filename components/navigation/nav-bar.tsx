import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";

import {
  AuthNavLink,
  // NavLinkItems,
  NavLogoLink,
  NavMenuItems,
} from "./nav-link";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";

export const Navbar = async () => {
  return (
    <HeroUINavbar
      classNames={{
        base: "border-b dark:border-b dark:border-neutral-800",
        wrapper: "!px-4",
      }}
      maxWidth="full"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NavLogoLink />
        </NavbarBrand>
        <ul className="flex w-full items-center">
          {/* <NavLinkItems /> */}
          <NavbarItem className="flex w-full justify-end gap-3">
            <Link isExternal aria-label="Github" href={siteConfig.links.github}>
              <GithubIcon className="text-default-500" />
            </Link>
            <ThemeSwitch />
            <AuthNavLink />
            <div className="sm:hidden basis-1 justify-end">
              <NavbarMenuToggle />
            </div>
          </NavbarItem>
        </ul>
      </NavbarContent>

      <NavbarMenu>
        <NavMenuItems />
      </NavbarMenu>
    </HeroUINavbar>
  );
};
