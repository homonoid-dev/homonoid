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
  const { orientation, color } = useStepperContext();
  const { isCompleted } = useStepperItemContext();

  const isHorizontal = orientation === "horizontal";

  const activeColorClass = match(
    color,
    {
      primary: "bg-primary",
      subtle: "bg-subtle-foreground",
      surface: "bg-foreground",
      destructive: "bg-destructive",
    },
    "bg-primary"
  );

  return (
    <div
      ref={ref}
      role="separator"
      aria-hidden="true"
      data-slot="stepper-separator"
      className={cn(
        "transition-colors rounded-full",
        cond(
          isHorizontal,
          "absolute top-5 start-14 end-4 h-0.5",
          "w-0.5 flex-1 min-h-6 my-2 ml-5 self-stretch"
        ),
        cond(isCompleted, activeColorClass, "bg-border"),
        className
      )}
      {...props}
    />
  );
});

StepperSeparator.displayName = "StepperSeparator";

