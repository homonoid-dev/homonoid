"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { DropdownSeparatorProps } from "./types";

export const DropdownSeparator = forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  function DropdownSeparator({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn("my-1 -mx-0.5 h-[0.5px] bg-border", className)}
        {...props}
      />
    );
  }
);

DropdownSeparator.displayName = "Dropdown.Separator";
