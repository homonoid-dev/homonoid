"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { BadgeLeadingProps } from "./types";

export const BadgeLeading = forwardRef<HTMLSpanElement, BadgeLeadingProps>(
  function BadgeLeading({ className, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        aria-hidden="true"
        data-slot="badge-leading"
        className={cn("inline-flex shrink-0 items-center justify-center", className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

BadgeLeading.displayName = "BadgeLeading";

