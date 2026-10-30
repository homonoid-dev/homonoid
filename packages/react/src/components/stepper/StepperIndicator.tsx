"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { all, any, cond, match } from "../../utils/condition";
import type { Color } from "../../types";
import { Button } from "../button/Button";
import { Spinner } from "../spinner/Spinner";
import { useStepperContext } from "./StepperContext";
import { useStepperItemContext } from "./StepperItemContext";
import type { StepperIndicatorProps } from "./types";

export const StepperIndicator = forwardRef<
  HTMLElement,
  StepperIndicatorProps
>(function StepperIndicator({ className, children, ...props }, ref) {
  const { variant, size, color, indicators } = useStepperContext();
  const { index, state, isActive, isCompleted, disabled } =
    useStepperItemContext();

  const isBar = variant === "bar";

  const activeBarColor = match(
    color,
    {
      primary: "bg-primary",
      subtle: "bg-subtle",
      surface: "bg-surface",
      destructive: "bg-destructive",
    },
    "bg-primary"
  );

  if (isBar) {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        data-slot="stepper-indicator"
        data-state={state}
        className={cn(
          "h-1 w-full rounded-full transition-colors",
          cond(
            state === "error",
            "bg-destructive",
            cond(
              any(isActive, isCompleted),
              activeBarColor,
              "bg-border"
            )
          ),
          className
        )}
        {...props}
      />
    );
  }

  const resolvedContent = cond(
    state === "loading",
    indicators?.loading ?? <Spinner size="sm" />,
    cond(
      all(isCompleted, Boolean(indicators?.completed)),
      indicators?.completed,
      children ?? index + 1
    )
  );

  const buttonColor = cond<Color, Color>(
    state === "error",
    "destructive",
    cond<Color, Color>(any(isActive, isCompleted), color, "surface")
  );

  const buttonVariant = cond<"contained" | "outlined", "contained" | "outlined">(
    any(isActive, isCompleted),
    "contained",
    "outlined"
  );

  return (
    <Button
      {...props}
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      layout="icon"
      radius="full"
      size={size}
      variant={buttonVariant}
      color={buttonColor}
      disabled={disabled}
      data-slot="stepper-indicator"
      data-state={state}
      className={cn("pointer-events-auto", className)}
    >
      {resolvedContent}
    </Button>
  );
});

StepperIndicator.displayName = "StepperIndicator";
