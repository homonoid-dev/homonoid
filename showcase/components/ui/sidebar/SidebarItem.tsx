"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@homonoid/react/cn";
import { cond, Tile } from "@homonoid/react";
import type { SidebarItemProps } from "./types";

export function SidebarItem({
  href = "#",
  icon,
  active,
  onClick,
  children,
  className,
  variant = "plain",
}: SidebarItemProps) {
  const pathname = usePathname();

  const isInternal = Boolean(href && !href.startsWith("#") && !href.startsWith("http"));
  const isSelected = cond(active !== undefined, Boolean(active), isInternal && pathname === href);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    onClick?.(e);
  };

  return (
    <Tile
      as={cond(isInternal, Link, "a")}
      href={href}
      onClick={handleClick}
      variant={variant}
      size="sm"
      radius="lg"
      selected={isSelected}
      trailing={icon}
      className={cn("w-full select-none cursor-pointer", className)}
    >
      {children}
    </Tile>
  );
}
