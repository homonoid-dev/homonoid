"use client";

import {
  forwardRef,
  useId,
  useEffect,
  useMemo,
} from "react";
import { cn } from "../../utils/cn";
import { any, cond } from "../../utils/condition";
import { useStepperContext } from "./StepperContext";
import { StepperItemContext } from "./StepperItemContext";
import type { StepperItemProps, StepperState } from "./types";

export const StepperItem = forwardRef<HTMLLIElement, StepperItemProps>(
  function StepperItem(
    {
      step,
      disabled = false,
      completed,
      loading = false,
      error = false,
      className,
      children,
      ...props
    },
    ref
  ) {
    const { value, orientation, stepValues, registerStep } = useStepperContext();
    const autoId = useId();
    const titleId = `stepper-title-${autoId}`;
    const descriptionId = `stepper-description-${autoId}`;

    useEffect(() => {
      return registerStep(step);
    }, [step, registerStep]);

    const index = useMemo(() => {
      const idx = stepValues.indexOf(step);
      return cond(idx >= 0, idx, 0);
    }, [stepValues, step]);

    const activeIndex = useMemo(() => {
      const idx = stepValues.indexOf(value);
      return cond(idx >= 0, idx, typeof value === "number" ? value - 1 : 0);
    }, [stepValues, value]);

    const isActive = value === step;
    const isCompletedCalculated = cond(
      completed !== undefined,
      Boolean(completed),
      index < activeIndex
    );
    const isCompleted = cond(isActive, false, isCompletedCalculated);
    const isUpcoming = any(!isActive, !isCompleted, !loading, !error);

    const state: StepperState = useMemo(() => {
      if (error) return "error";
      if (loading) return "loading";
      if (disabled) return "disabled";
      if (isActive) return "active";
      if (isCompleted) return "completed";
      return "inactive";
    }, [error, loading, disabled, isActive, isCompleted]);

    const contextValue = useMemo(
      () => ({
        step,
        index,
        state,
        disabled,
        isCompleted,
        isActive,
        isUpcoming,
        titleId,
        descriptionId,
      }),
      [
        step,
        index,
        state,
        disabled,
        isCompleted,
        isActive,
        isUpcoming,
        titleId,
        descriptionId,
      ]
    );

    const isHorizontal = orientation === "horizontal";

    return (
      <StepperItemContext.Provider value={contextValue}>
        <li
          ref={ref}
          role="listitem"
          data-slot="stepper-item"
          data-state={state}
          data-orientation={orientation}
          aria-disabled={cond(disabled, true, undefined)}
          className={cn(
            "group/step relative flex",
            cond(
              isHorizontal,
              "flex-1 flex-col items-start",
              "flex-col items-start w-full"
            ),
            className
          )}
          {...props}
        >
          {children}
        </li>
      </StepperItemContext.Provider>
    );
  }
);

StepperItem.displayName = "StepperItem";

