"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@homonoid/react/cn";
import { cond, Tooltip, Tile } from "@homonoid/react";
import { useSidebar } from "./context";
import type { SidebarDestinationProps } from "./types";

export function SidebarDestination({
  href,
  icon,
  active,
  onClick,
  children,
  className,
  variant,
}: SidebarDestinationProps) {
  const { collapsed, side } = useSidebar();
  const pathname = usePathname();
  const isSelected = cond(
    active !== undefined,
    active,
    cond(Boolean(href), pathname === href, false)
  );

  const resolvedVariant = variant ?? cond(side === "right", "plain", "tile");
  const showLabel = !collapsed;
  const labelText = cond(typeof children === "string", children as string, undefined);
  const tooltipSide = cond(side === "right", "left", "right");
  const isInternalRoute = Boolean(href && !href.startsWith("#"));

  if (resolvedVariant === "plain") {
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
      "group h-control-sm text-sm flex items-center w-full shrink-0 transition-colors duration-200 cursor-pointer select-none",
      cond(collapsed, "justify-center", "justify-between"),
      cond(
        isSelected,
        "text-foreground font-medium",
        "text-muted hover:text-foreground"
      ),
      className
    );

    const plainTrigger = cond(
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
        {plainTrigger}
      </Tooltip>
    );
  }

  const tileClasses = cn(
    "w-full text-sm select-none cursor-pointer",
    cond(
      isSelected,
      "text-foreground font-medium bg-surface-hover hover:bg-surface-hover focus:bg-surface-hover",
      "text-muted hover:text-foreground"
    ),
    cond(collapsed, "justify-center px-0", ""),
    className
  );

  const tileTrigger = (
    <Tile
      as={cond(isInternalRoute, Link, "a")}
      href={cond(Boolean(href), href as string, cond(isInternalRoute, "/", "#"))}
      onClick={(e) => {
        if (!isInternalRoute && onClick) {
          e.preventDefault();
        }
        onClick?.(e);
      }}
      variant="plain"
      size="sm"
      radius="md"
      selected={isSelected}
      trailing={icon}
      aria-label={labelText}
      className={tileClasses}
    >
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
    </Tile>
  );

  return (
    <Tooltip
      content={cond(Boolean(labelText), labelText, children)}
      side={tooltipSide}
      offset={8}
      disabled={!collapsed}
    >
      {tileTrigger}
    </Tooltip>
  );
}
