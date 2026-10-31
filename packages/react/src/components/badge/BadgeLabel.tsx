"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { Label } from "../label/Label";
import { useBadgeContext } from "./BadgeContext";
import type { BadgeLabelProps } from "./types";

export const BadgeLabel = forwardRef<HTMLSpanElement, BadgeLabelProps>(
  function BadgeLabel({ className, children, ...props }, ref) {
    const { size } = useBadgeContext();
    const labelSize = size === "lg" ? "md" : "sm";

    return (
      <Label
        ref={ref}
        as="span"
        size={labelSize}
        data-slot="badge-label"
        className={cn("text-inherit leading-none tracking-tight font-medium", className)}
        {...props}
      >
        {children}
      </Label>
    );
  }
);

BadgeLabel.displayName = "BadgeLabel";

