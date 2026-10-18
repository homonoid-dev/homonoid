"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@harmonia/react/cn";
import { cond, Tooltip } from "@harmonia/react";
import { useSidebar } from "./context";
import type { SidebarDestinationProps } from "./types";

export function SidebarDestination({
  href,
  icon,
  active,
  onClick,
  children,
  className,
}: SidebarDestinationProps) {
  const { collapsed, side } = useSidebar();
  const pathname = usePathname();
  const isSelected = cond(
    active !== undefined,
    active,
    cond(Boolean(href), pathname === href, false)
  );

  const showLabel = !collapsed;
  const labelText = cond(typeof children === "string", children as string, undefined);
  const tooltipSide = cond(side === "right", "left", "right");

  const content = (
    <>
      <span
        className={cn(
          "truncate transition-[opacity,max-width] duration-300 ease-in-out whitespace-nowrap",
          cond(
            showLabel,
            "max-w-full opacity-100",
            "max-w-0 opacity-0 overflow-hidden pointer-events-none"
          )
        )}
      >
        {children}
      </span>
      {icon && (
        <span
          className={cn(
            "shrink-0 transition-[color] duration-300 ease-in-out flex items-center justify-center",
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
    </>
  );

  const classes = cn(
    "group text-sm flex items-center w-full py-1 transition-colors duration-300 cursor-pointer select-none",
    cond(collapsed, "justify-center", "justify-between"),
    cond(
      isSelected,
      "text-foreground font-medium",
      "text-muted hover:text-foreground"
    ),
    className
  );

  const isInternalRoute = Boolean(href && !href.startsWith("#"));

  const trigger = cond(
    isInternalRoute,
    <Link
      href={cond(isInternalRoute, href as string, "/")}
      onClick={onClick}
      aria-label={labelText}
      className={classes}
    >
      {content}
    </Link>,
    <a
      href={cond(Boolean(href), href as string, "#")}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      aria-label={labelText}
      className={classes}
    >
      {content}
    </a>
  );

  return (
    <Tooltip
      content={cond(Boolean(labelText), labelText, children)}
      side={tooltipSide}
      offset={8}
      disabled={!collapsed}
    >
      {trigger}
    </Tooltip>
  );
}
