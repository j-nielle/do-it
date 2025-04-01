"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbLinks } from "@/types/link";

interface BreadcrumbProps {
  links: BreadcrumbLinks[];
}

export default function BreadCrumb({ links }: BreadcrumbProps) {
  const pathname = usePathname();

  return (
    <div className="mb-4">
      <Breadcrumb>
        <BreadcrumbList>
          {links.map(({ href, label }, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {href === pathname ? (
                  <BreadcrumbPage>
                    <BreadcrumbLink asChild>
                      <Link href={href}>{label}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < links.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
