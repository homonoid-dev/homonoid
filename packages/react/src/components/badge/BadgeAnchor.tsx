"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { BadgeAnchorProps } from "./types";

export const BadgeAnchor = forwardRef<HTMLDivElement, BadgeAnchorProps>(
  function BadgeAnchor({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="badge-anchor"
        className={cn("relative inline-flex shrink-0", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BadgeAnchor.displayName = "BadgeAnchor";

