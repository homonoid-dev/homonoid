"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { all, cond, when } from "../../utils/condition";
import { Tile } from "../tile/Tile";
import { Tooltip } from "../tooltip/Tooltip";
import { Badge } from "../badge/Badge";
import { useSidebarContext } from "./SidebarContext";
import type { SidebarItemProps } from "./types";

export const SidebarItem = forwardRef<HTMLElement, SidebarItemProps>(
  function SidebarItem(
    {
      as,
      href,
      active = false,
      disabled = false,
      size = "sm",
      leading,
      trailing,
      badge,
      tooltip,
      variant = "plain",
      color,
      children,
      className,
      ...props
    },
    ref
  ) {
    const { collapsed } = useSidebarContext();

    const Component = as || cond(Boolean(href), "a", "button");

    const badgeElement = when(
      Boolean(badge),
      typeof badge === "string" || typeof badge === "number" ? (
        <Badge size="sm" color="surface" className="ml-auto text-2xs px-1.5 py-0">
          {badge}
        </Badge>
      ) : (
        badge
      )
    );

    const trailingElement = when(
      !collapsed,
      cond(
        Boolean(badge) && Boolean(trailing),
        <div className="flex items-center gap-1.5 ml-auto">
          {badgeElement}
          {trailing}
        </div>,
        cond(Boolean(badge), badgeElement, trailing)
      )
    );

    const tileElement = (
      <Tile
        ref={ref as any}
        as={Component}
        href={href}
        variant={variant}
        color={color}
        size={size}
        radius="lg"
        selected={active}
        disabled={disabled}
        aria-current={cond(active, "page", undefined)}
        leading={leading}
        trailing={trailingElement}
        className={cn(
          cond(collapsed, "justify-center px-0", undefined),
          className
        )}
        {...props}
      >
        {cond(collapsed, null, children)}
      </Tile>
    );

    const tooltipContent = tooltip || (typeof children === "string" ? children : undefined);

    if (all(collapsed, Boolean(tooltipContent))) {
      return (
        <Tooltip content={tooltipContent} side="right" align="center">
          {tileElement}
        </Tooltip>
      );
    }

    return tileElement;
  }
);

SidebarItem.displayName = "Sidebar.Item";

