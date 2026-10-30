"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { BadgeTrailingProps } from "./types";

export const BadgeTrailing = forwardRef<HTMLSpanElement, BadgeTrailingProps>(
  function BadgeTrailing({ className, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="badge-trailing"
        className={cn("inline-flex shrink-0 items-center justify-center", className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

BadgeTrailing.displayName = "BadgeTrailing";

