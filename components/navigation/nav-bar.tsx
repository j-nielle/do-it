import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  AuthNavLink,
  NavLinkItems,
  NavLogoLink,
  NavMenuItems,
} from "./nav-link";
import { GithubIcon } from "@/components/icons";

export const Navbar = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value || null;

  return (
    <HeroUINavbar
      maxWidth="full"
      position="sticky"
      classNames={{
        wrapper: "!px-4",
      }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NavLogoLink session={session} />
        </NavbarBrand>
        <ul className="flex w-full items-center">
          <NavLinkItems session={session} />
          <NavbarItem className="flex w-full justify-end gap-3">
            <Link isExternal aria-label="Github" href={siteConfig.links.github}>
              <GithubIcon className="text-default-500" />
            </Link>
            <ThemeSwitch />
            <AuthNavLink session={session} />
            <div className="sm:hidden basis-1 justify-end">
              <NavbarMenuToggle />
            </div>
          </NavbarItem>
        </ul>
      </NavbarContent>

      <NavbarMenu>
        <NavMenuItems session={session} />
      </NavbarMenu>
    </HeroUINavbar>
  );
};
