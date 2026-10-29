"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cva } from "class-variance-authority";
import { cn } from "@homonoid/react/cn";
import { cond, when, Tooltip, Tile } from "@homonoid/react";
import { useSidebar } from "./context";
import type { SidebarItemProps } from "./types";

export const plainItemVariants = cva(
  "group h-control-sm text-sm flex items-center w-full shrink-0 transition-colors duration-200 cursor-pointer select-none",
  {
    variants: {
      collapsed: {
        true: "justify-center",
        false: "justify-between",
      },
      selected: {
        true: "text-foreground font-medium",
        false: "text-muted hover:text-foreground",
      },
    },
    defaultVariants: {
      collapsed: false,
      selected: false,
    },
  }
);

export const tileItemVariants = cva(
  "w-full text-sm select-none cursor-pointer",
  {
    variants: {
      collapsed: {
        true: "justify-center px-0",
        false: "",
      },
      selected: {
        true: "text-foreground font-medium bg-surface-hover hover:bg-surface-hover focus:bg-surface-hover",
        false: "text-muted hover:text-foreground",
      },
    },
    defaultVariants: {
      collapsed: false,
      selected: false,
    },
  }
);

export function SidebarItem({
  href = "#",
  icon,
  active,
  onClick,
  children,
  className,
  variant,
}: SidebarItemProps) {
  const { collapsed, side } = useSidebar();
  const pathname = usePathname();

  const isInternal = Boolean(href && !href.startsWith("#") && !href.startsWith("http"));
  const isSelected = cond(active !== undefined, Boolean(active), isInternal && pathname === href);
  const resolvedVariant = variant ?? cond(side === "right", "plain", "tile");
  const labelText = cond(typeof children === "string", children as string, undefined);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (!isInternal && href.startsWith("#")) {
      e.preventDefault();
    }
    onClick?.(e);
  };

  const label = (
    <span
      className={cn(
        "truncate transition-[opacity,max-width] duration-300 ease-in-out whitespace-nowrap",
        cond(
          collapsed,
          "max-w-0 opacity-0 overflow-hidden pointer-events-none",
          "max-w-full opacity-100"
        )
      )}
    >
      {children}
    </span>
  );

  const Component = cond(isInternal, Link, "a");

  const trigger = cond(
    resolvedVariant === "tile",
    <Tile
      as={Component}
      href={href}
      onClick={handleClick}
      variant="plain"
      size="sm"
      radius="lg"
      selected={isSelected}
      trailing={icon}
      aria-label={labelText}
      className={cn(tileItemVariants({ collapsed, selected: isSelected }), className)}
    >
      {label}
    </Tile>,
    <Component
      href={href}
      onClick={handleClick}
      aria-label={labelText}
      className={cn(plainItemVariants({ collapsed, selected: isSelected }), className)}
    >
      {label}
      {when(
        Boolean(icon),
        <span
          className={cn(
            "shrink-0 transition-colors duration-300 flex items-center justify-center",
            cond(
              isSelected,
              "text-foreground",
              "text-muted group-hover:text-foreground"
            )
          )}
        >
          {icon}
        </span>
      )}
    </Component>
  );

  return (
    <Tooltip
      content={labelText ?? children}
      side={cond(side === "right", "left", "right")}
      offset={8}
      disabled={!collapsed}
    >
      {trigger}
    </Tooltip>
  );
}

export const SidebarDestination = SidebarItem;

