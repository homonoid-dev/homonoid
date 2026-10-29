"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@homonoid/react/cn";
import { cond, Tooltip, Tile } from "@homonoid/react";
import { useSidebar } from "./context";
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
  const { collapsed, side } = useSidebar();
  const pathname = usePathname();

  const isInternal = Boolean(href && !href.startsWith("#") && !href.startsWith("http"));
  const isSelected = cond(active !== undefined, Boolean(active), isInternal && pathname === href);
  const labelText = cond(typeof children === "string", children as string, undefined);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (!isInternal && href.startsWith("#")) {
      e.preventDefault();
    }
    onClick?.(e);
  };

  return (
    <Tooltip
      content={labelText ?? children}
      side={cond(side === "right", "left", "right")}
      offset={8}
      disabled={!collapsed}
    >
      <Tile
        as={cond(isInternal, Link, "a")}
        href={href}
        onClick={handleClick}
        variant={variant}
        size="sm"
        radius="lg"
        selected={isSelected}
        trailing={icon}
        aria-label={labelText}
        className={cn(
          "w-full select-none cursor-pointer",
          cond(collapsed, "justify-center px-0", "justify-between"),
          className
        )}
      >
        <span
          className={cn(
            "truncate transition-[opacity,max-width] duration-300 ease-in-out whitespace-nowrap",
            cond(
              collapsed,
              "max-w-0 opacity-0 overflow-hidden pointer-events-none",
              "min-w-0 flex-1 text-left opacity-100"
            )
          )}
        >
          {children}
        </span>
      </Tile>
    </Tooltip>
  );
}

export const SidebarDestination = SidebarItem;
