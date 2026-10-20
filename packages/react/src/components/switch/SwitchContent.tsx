"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { SwitchContentProps } from "./types";

export const SwitchContent = forwardRef<HTMLSpanElement, SwitchContentProps>(
  function SwitchContent({ className, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        className={cn("flex flex-col gap-0.5 select-none", className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

SwitchContent.displayName = "Switch.Content";
