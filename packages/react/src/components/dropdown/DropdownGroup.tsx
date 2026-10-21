"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { DropdownGroupProps } from "./types";

export const DropdownGroup = forwardRef<HTMLDivElement, DropdownGroupProps>(
  function DropdownGroup({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        role="group"
        className={cn("flex flex-col gap-0.5", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropdownGroup.displayName = "Dropdown.Group";
