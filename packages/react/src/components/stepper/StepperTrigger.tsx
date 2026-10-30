"use client";

import { forwardRef, type KeyboardEvent, type MouseEvent } from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useStepperContext } from "./StepperContext";
import { useStepperItemContext } from "./StepperItemContext";
import type { StepperTriggerProps } from "./types";

export const StepperTrigger = forwardRef<
  HTMLButtonElement,
  StepperTriggerProps
>(function StepperTrigger(
  { className, onClick, onKeyDown, children, disabled: propDisabled, ...props },
  ref
) {
  const { value, setValue, linear, variant, stepValues } = useStepperContext();
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

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    onClick?.(event);
    if (!event.defaultPrevented) {
      setValue(step);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || isDisabled) return;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
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
    <button
      ref={ref}
      type="button"
      data-slot="stepper-trigger"
      data-state={state}
      aria-current={cond(isActive, "step", undefined)}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      disabled={isDisabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "group/trigger relative inline-flex text-left select-none cursor-pointer focus-ring outline-none transition-colors",
        "disabled:cursor-not-allowed disabled:pointer-events-none",
        cond(
          isBar,
          "w-full flex-col items-start gap-2.5",
          "w-full flex-col items-start gap-2"
        ),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

StepperTrigger.displayName = "StepperTrigger";

