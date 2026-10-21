"use client";

import { forwardRef } from "react";
import { Separator } from "../separator/Separator";
import { cn } from "../../utils/cn";
import type { SelectSeparatorProps } from "./types";

export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(
  function SelectSeparator({ className, decorative = false, ...props }, ref) {
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

SelectSeparator.displayName = "Select.Separator";
