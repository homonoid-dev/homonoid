"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { any, cond } from "../../utils/condition";
import { variants as buttonVariants } from "../button/Button";
import { Spinner } from "../spinner/Spinner";
import { useStepperContext } from "./StepperContext";
import { useStepperItemContext } from "./StepperItemContext";
import type { StepperIndicatorProps } from "./types";

function DefaultCheckIcon() {
  return (
    <svg
      data-slot="stepper-check-icon"
      className="size-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export const StepperIndicator = forwardRef<
  HTMLDivElement,
  StepperIndicatorProps
>(function StepperIndicator({ className, children, ...props }, ref) {
  const { variant, size, indicators } = useStepperContext();
  const { index, state, isActive, isCompleted } = useStepperItemContext();

  const isBar = variant === "bar";

  if (isBar) {
    return (
      <div
        ref={ref}
        data-slot="stepper-indicator"
        data-state={state}
        className={cn(
          "h-1 w-full rounded-full transition-colors",
          cond(
            state === "error",
            "bg-destructive",
            cond(
              any(isActive, isCompleted),
              "bg-primary",
              "bg-border"
            )
          ),
          className
        )}
        {...props}
      />
    );
  }

  const indicatorButtonClasses = buttonVariants({
    layout: "icon",
    radius: "full",
    size,
    variant: cond(
      state === "error",
      "contained",
      cond(any(isActive, isCompleted), "contained", "outlined")
    ),
    color: cond(
      state === "error",
      "destructive",
      cond(any(isActive, isCompleted), "primary", "surface")
    ),
  });

  const resolvedContent = cond(
    state === "loading",
    indicators?.loading ?? <Spinner size="sm" />,
    cond(
      isCompleted,
      indicators?.completed ?? children ?? <DefaultCheckIcon />,
      children ?? index + 1
    )
  );

  return (
    <div
      ref={ref}
      data-slot="stepper-indicator"
      data-state={state}
      className={cn(indicatorButtonClasses, className)}
      {...props}
    >
      {resolvedContent}
    </div>
  );
});

StepperIndicator.displayName = "StepperIndicator";

