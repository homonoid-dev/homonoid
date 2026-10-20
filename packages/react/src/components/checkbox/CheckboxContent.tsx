"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { CheckboxContentProps } from "./types";

export const checkboxContentVariants = cva("flex flex-col gap-0.5 select-none");

export const CheckboxContent = forwardRef<HTMLSpanElement, CheckboxContentProps>(
  function CheckboxContent({ className, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        className={cn(checkboxContentVariants(), className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

CheckboxContent.displayName = "Checkbox.Content";
