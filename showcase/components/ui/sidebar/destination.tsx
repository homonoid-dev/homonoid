"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@homonoid/react/cn";
import { cond, when, Tooltip, Tile } from "@homonoid/react";
import { useSidebar } from "./context";
import type { SidebarDestinationProps } from "./types";

export function SidebarDestination({
  href = "#",
  icon,
  active,
  onClick,
  children,
  className,
  variant,
}: SidebarDestinationProps) {
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
      className={cn(
        "w-full text-sm select-none cursor-pointer",
        cond(
          isSelected,
          "text-foreground font-medium bg-surface-hover hover:bg-surface-hover focus:bg-surface-hover",
          "text-muted hover:text-foreground"
        ),
        cond(collapsed, "justify-center px-0", ""),
        className
      )}
    >
      {label}
    </Tile>,
    <Component
      href={href}
      onClick={handleClick}
      aria-label={labelText}
      className={cn(
        "group h-control-sm text-sm flex items-center w-full shrink-0 transition-colors duration-200 cursor-pointer select-none",
        cond(collapsed, "justify-center", "justify-between"),
        cond(
          isSelected,
          "text-foreground font-medium",
          "text-muted hover:text-foreground"
        ),
        className
      )}
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
