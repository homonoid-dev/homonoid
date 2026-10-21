"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { SelectGroupProps } from "./types";

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  function SelectGroup({ children, className, ...props }, ref) {
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

SelectGroup.displayName = "Select.Group";
