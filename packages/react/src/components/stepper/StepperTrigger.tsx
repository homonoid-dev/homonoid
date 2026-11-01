"use client";

import { forwardRef, type KeyboardEvent, type MouseEvent } from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useStepperContext } from "./StepperContext";
import { useStepperItemContext } from "./StepperItemContext";
import type { StepperTriggerProps } from "./types";

export const StepperTrigger = forwardRef<
  HTMLDivElement,
  StepperTriggerProps
>(function StepperTrigger(
  { className, onClick, onKeyDown, children, disabled: propDisabled, ...props },
  ref
) {
  const { setValue, linear, variant, stepValues } = useStepperContext();
  const {
    step,
    index,
    state,
    disabled: itemDisabled,
    isActive,
    isCompleted,
    titleId,
    descriptionId,
  } = useStepperItemContext();

  const isBar = variant === "bar";
  const isDisabled = propDisabled || itemDisabled || (linear && !isCompleted && !isActive);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (isDisabled) return;
    onClick?.(event);
    if (!event.defaultPrevented) {
      setValue(step);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || isDisabled) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setValue(step);
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < stepValues.length) {
        setValue(stepValues[nextIndex]);
      }
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const prevIndex = index - 1;
      if (prevIndex >= 0) {
        setValue(stepValues[prevIndex]);
      }
    }
  };

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={cond(isBar, cond(isDisabled, -1, 0), -1)}
      data-slot="stepper-trigger"
      data-state={state}
      aria-current={cond(isActive, "step", undefined)}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-disabled={cond(isDisabled, true, undefined)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "group/trigger relative inline-flex select-none cursor-pointer focus-ring outline-none transition-colors",
        cond(isDisabled, "cursor-not-allowed pointer-events-none opacity-50", ""),
        cond(
          isBar,
          "w-full flex-col items-start gap-2.5 text-left",
          "w-full flex-col items-center gap-2 text-center"
        ),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

StepperTrigger.displayName = "StepperTrigger";

