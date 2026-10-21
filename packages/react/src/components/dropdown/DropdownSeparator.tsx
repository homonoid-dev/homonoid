"use client";

import { forwardRef } from "react";
import { Separator } from "../separator/Separator";
import { cn } from "../../utils/cn";
import type { DropdownSeparatorProps } from "./types";

export const DropdownSeparator = forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  function DropdownSeparator({ className, decorative = false, ...props }, ref) {
    return (
      <Separator
        ref={ref}
        orientation="horizontal"
        decorative={decorative}
        className={cn("my-1 -mx-0.5", className)}
        {...props}
      />
    );
  }
);

DropdownSeparator.displayName = "Dropdown.Separator";
