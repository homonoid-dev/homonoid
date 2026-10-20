"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { CheckboxContentProps } from "./types";

export const CheckboxContent = forwardRef<HTMLSpanElement, CheckboxContentProps>(
  function CheckboxContent({ className, children, ...props }, ref) {
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

CheckboxContent.displayName = "Checkbox.Content";
