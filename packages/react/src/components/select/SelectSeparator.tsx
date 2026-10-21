"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { SelectSeparatorProps } from "./types";

export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(
  function SelectSeparator({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn("my-1 h-[0.5px] bg-border", className)}
        {...props}
      />
    );
  }
);

SelectSeparator.displayName = "Select.Separator";
