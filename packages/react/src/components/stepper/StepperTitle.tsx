"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { any, cond } from "../../utils/condition";
import { Label } from "../label/Label";
import { useStepperItemContext } from "./StepperItemContext";
import type { StepperTitleProps } from "./types";

export const StepperTitle = forwardRef<HTMLElement, StepperTitleProps>(
  function StepperTitle({ className, children, size = "md", ...props }, ref) {
    const { titleId, isActive, isCompleted, disabled } =
      useStepperItemContext();

    return (
      <Label
        ref={ref}
        id={titleId}
        size={size}
        disabled={disabled}
        data-slot="stepper-title"
        className={cn(
          "transition-colors select-none",
          cond(
            any(isActive, isCompleted),
            "text-foreground",
            "text-muted"
          ),
          className
        )}
        {...props}
      >
        {children}
      </Label>
    );
  }
);

StepperTitle.displayName = "StepperTitle";

