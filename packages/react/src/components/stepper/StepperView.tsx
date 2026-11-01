"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { useStepperContext } from "./StepperContext";
import type { StepperViewProps } from "./types";

export const StepperView = forwardRef<HTMLDivElement, StepperViewProps>(
  function StepperView({ value: stepValue, className, children, ...props }, ref) {
    const { value: activeValue } = useStepperContext();

    const isVisible = stepValue === undefined || stepValue === activeValue;

    if (!isVisible) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="region"
        data-slot="stepper-view"
        data-step={stepValue}
        className={cn("w-full focus-ring outline-none", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

StepperView.displayName = "StepperView";

