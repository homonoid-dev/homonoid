"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { Description } from "../description/Description";
import { useStepperItemContext } from "./StepperItemContext";
import type { StepperDescriptionProps } from "./types";

export const StepperDescription = forwardRef<
  HTMLElement,
  StepperDescriptionProps
>(function StepperDescription(
  { className, children, size = "sm", variant = "muted", ...props },
  ref
) {
  const { descriptionId, isActive, disabled } = useStepperItemContext();

  return (
    <Description
      ref={ref}
      id={descriptionId}
      size={size}
      variant={variant}
      disabled={disabled}
      data-slot="stepper-description"
      className={cn(
        "transition-colors select-none",
        cond(isActive, "text-subtle-foreground", "text-muted"),
        className
      )}
      {...props}
    >
      {children}
    </Description>
  );
});

StepperDescription.displayName = "StepperDescription";

