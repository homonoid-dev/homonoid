"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { cond, match } from "../../utils/condition";
import { useStepperContext } from "./StepperContext";
import { useStepperItemContext } from "./StepperItemContext";
import type { StepperSeparatorProps } from "./types";

export const StepperSeparator = forwardRef<
  HTMLDivElement,
  StepperSeparatorProps
>(function StepperSeparator({ className, ...props }, ref) {
  const { orientation, color, size } = useStepperContext();
  const { isCompleted } = useStepperItemContext();

  const isHorizontal = orientation === "horizontal";

  const activeColorClass = match(
    color,
    {
      primary: "bg-primary",
      subtle: "bg-subtle-border",
      surface: "bg-border",
      destructive: "bg-destructive",
    },
    "bg-primary"
  );

  const horizontalSizeClass = match(
    size,
    {
      sm: "top-4 px-6",
      md: "top-5 px-7",
      lg: "top-6 px-8",
    },
    "top-5 px-7"
  );

  return (
    <div
      ref={ref}
      role="separator"
      aria-hidden="true"
      data-slot="stepper-separator"
      className={cn(
        "transition-colors pointer-events-none",
        cond(
          isHorizontal,
          cn("absolute left-1/2 w-full -translate-y-1/2", horizontalSizeClass),
          "w-0.5 flex-1 min-h-6 my-2 ml-5 self-stretch"
        ),
        className
      )}
      {...props}
    >
      {cond(
        isHorizontal,
        <div
          className={cn(
            "h-0.5 w-full rounded-full transition-colors",
            cond(isCompleted, activeColorClass, "bg-border")
          )}
        />,
        <div
          className={cn(
            "w-0.5 h-full rounded-full transition-colors",
            cond(isCompleted, activeColorClass, "bg-border")
          )}
        />
      )}
    </div>
  );
});

StepperSeparator.displayName = "StepperSeparator";

