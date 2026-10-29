"use client";

import { cn } from "@homonoid/react/cn";
import { cond, Tooltip } from "@homonoid/react";
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
  return cond(
    Boolean(collapsed),
    <Tooltip content={label} side="left" offset={8}>
      <a
        href={href}
        onClick={onClick}
        aria-label={label}
        className={cn(
          "flex items-center justify-center size-control-sm rounded-lg transition-colors select-none cursor-pointer",
          cond(
            Boolean(active),
            "bg-surface-hover text-foreground font-medium",
            "text-muted hover:text-foreground"
          ),
          className
        )}
      >
        {icon}
      </a>
    </Tooltip>,
    <a
      href={href}
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex items-center justify-between w-full h-control-sm px-3 rounded-lg text-xs transition-colors select-none cursor-pointer",
        cond(
          Boolean(active),
          "bg-surface-hover text-foreground font-medium",
          "text-muted hover:text-foreground"
        ),
        className
      )}
    >
      <span className="truncate">{label}</span>
      {icon && <span className="shrink-0">{icon}</span>}
    </a>
  );
}
