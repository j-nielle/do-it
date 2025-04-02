"use client";

import React from "react";
import NextLink from "next/link";
import clsx from "clsx";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/button";
import { NavbarItem, NavbarMenuItem } from "@heroui/navbar";

import { siteConfig } from "@/config/site";
import { handleLogout } from "@/lib/firebase/auth";
import { useUserSession } from "@/hooks/useUserSession";
import { Logo } from "@/components/icons";

export const AuthNavLink = ({ session }: { session: string | null }) => {
  const userSessionId = useUserSession(session);
  const pathname = usePathname();

  return userSessionId ? (
    <Button
      className="hidden sm:flex justify-center items-center"
      color="danger"
      variant="shadow"
      onPress={handleLogout}
    >
      Logout
    </Button>
  ) : (
    <NextLink
      className="hidden sm:flex justify-center items-center z-0 group relative box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none shadow-lg shadow-primary/40 bg-primary text-primary-foreground data-[hover=true]:opacity-hover"
      href={
        pathname === "/login"
          ? siteConfig.links.register
          : siteConfig.links.login
      }
    >
      {pathname === "/login" ? "Register" : "Login"}
    </NextLink>
  );
};

export const NavLogoLink = ({ session }: { session: string | null }) => {
  const userSessionId = useUserSession(session);

  return (
    <NextLink
      className="flex justify-start items-center gap-1"
      href={userSessionId ? "/dashboard" : "/"}
    >
      <Logo />
      <p className="font-bold text-inherit uppercase">Do It</p>
    </NextLink>
  );
};

export const NavLinkItems = ({ session }: { session: string | null }) => {
  const userSessionId = useUserSession(session);

  return (
    userSessionId && (
      <div className="hidden sm:flex">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              href={item.href}
            >
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
      </div>
    )
  );
};

export const NavMenuItems = ({ session }: { session: string | null }) => {
  const userSessionId = useUserSession(session);
  const pathname = usePathname();

  return (
    <div className="mx-4 mt-2 flex flex-col gap-2">
      {!userSessionId ? (
        <NavbarMenuItem>
          <Link
            color="foreground"
            href={
              pathname === "/login"
                ? siteConfig.links.register
                : siteConfig.links.login
            }
            size="lg"
          >
            {pathname === "/login" ? "Register" : "Login"}
          </Link>
        </NavbarMenuItem>
      ) : (
        <Button color="danger" onPress={handleLogout}>
          Logout
        </Button>
      )}
    </div>
  );
};
