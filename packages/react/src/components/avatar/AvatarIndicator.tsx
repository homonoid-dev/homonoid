"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { cond, match } from "../../utils/condition";
import { BadgeIndicator } from "../badge/BadgeIndicator";
import { BadgeContext } from "../badge/BadgeContext";
import { useAvatarContext } from "./AvatarContext";
import type { AvatarIndicatorProps, AvatarPlacement, AvatarStatus } from "./types";

const STATUS_COLOR_MAP: Record<
  AvatarStatus,
  {
    color: "primary" | "subtle" | "surface" | "destructive";
    className: string;
    label: string;
  }
> = {
  online: {
    color: "primary",
    className: "bg-emerald-500 text-white border-transparent",
    label: "Online",
  },
  away: {
    color: "subtle",
    className: "bg-amber-500 text-white border-transparent",
    label: "Away",
  },
  busy: {
    color: "destructive",
    className: "bg-destructive text-destructive-foreground border-transparent",
    label: "Busy",
  },
  offline: {
    color: "subtle",
    className: "bg-muted text-muted-foreground border-transparent",
    label: "Offline",
  },
};

export const AvatarIndicator = forwardRef<HTMLSpanElement, AvatarIndicatorProps>(
  function AvatarIndicator(
    {
      status,
      placement = "bottom-right",
      color: propColor,
      size: propSize,
      className,
      children,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) {
    const avatarContext = useAvatarContext();
    const size = propSize ?? avatarContext.size ?? "md";
    const statusMeta = cond(
      Boolean(status),
      STATUS_COLOR_MAP[status as AvatarStatus],
      undefined
    );

    const resolvedColor = propColor ?? statusMeta?.color ?? "primary";
    const resolvedLabel = ariaLabel ?? statusMeta?.label;

    const placementClass = match<AvatarPlacement, string>(
      placement,
      {
        "top-right": "top-0.5 right-0.5",
        "top-left": "top-0.5 left-0.5",
        "bottom-right": "bottom-0.5 right-0.5",
        "bottom-left": "bottom-0.5 left-0.5",
      },
      "bottom-0.5 right-0.5"
    );

    return (
      <BadgeContext.Provider value={{ size, color: resolvedColor, radius: "full" }}>
        <BadgeIndicator
          ref={ref}
          data-slot="avatar-indicator"
          dot={!Boolean(children)}
          color={resolvedColor}
          size={size}
          radius="full"
          aria-label={resolvedLabel}
          className={cn(
            "absolute z-10 pointer-events-none ring-2 ring-background",
            placementClass,
            statusMeta?.className,
            className
          )}
          {...props}
        >
          {children}
        </BadgeIndicator>
      </BadgeContext.Provider>
    );
  }
);

AvatarIndicator.displayName = "AvatarIndicator";
