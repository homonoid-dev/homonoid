"use client";

import { cn } from "@homonoid/react/cn";
import { cond, when, Tooltip } from "@homonoid/react";
import type { TocItemProps } from "./types";

export function TocItem({
  href,
  label,
  icon,
  active,
  collapsed,
  onClick,
  className,
}: TocItemProps) {
  const isCollapsed = Boolean(collapsed);
  const isSelected = Boolean(active);

  const link = (
    <a
      href={href}
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex items-center size-control-sm text-xs transition-colors select-none cursor-pointer",
        cond(
          isCollapsed,
          "justify-center px-0",
          "w-full px-3 justify-between"
        ),
        cond(
          isSelected,
          "text-foreground",
          "text-muted hover:text-foreground"
        ),
        className
      )}
    >
      {when(!isCollapsed, <span className="truncate">{label}</span>)}
      {when(Boolean(icon), <span className="shrink-0">{icon}</span>)}
    </a>
  );

  return (
    <Tooltip content={label} side="left" offset={8} disabled={!isCollapsed}>
      {link}
    </Tooltip>
  );
}