"use client";

import {
  useState,
  useCallback,
  useMemo,
  forwardRef,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import { any, cond, when } from "../../utils/condition";
import { StepperContext, type StepperContextValue } from "./StepperContext";
import { StepperList } from "./StepperList";
import { StepperItem } from "./StepperItem";
import { StepperTrigger } from "./StepperTrigger";
import { StepperIndicator } from "./StepperIndicator";
import { StepperTitle } from "./StepperTitle";
import { StepperDescription } from "./StepperDescription";
import { StepperSeparator } from "./StepperSeparator";
import { StepperView } from "./StepperView";
import type { StepperProps } from "./types";

interface StepperComponent
  extends React.ForwardRefExoticComponent<
    StepperProps & React.RefAttributes<HTMLDivElement>
  > {
  List: typeof StepperList;
  Item: typeof StepperItem;
  Trigger: typeof StepperTrigger;
  Indicator: typeof StepperIndicator;
  Title: typeof StepperTitle;
  Description: typeof StepperDescription;
  Separator: typeof StepperSeparator;
  View: typeof StepperView;
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  function Stepper(
    {
      value: controlledValue,
      defaultValue = 1,
      onValueChange,
      orientation = "horizontal",
      variant = "circle",
      size = "md",
      linear = false,
      indicators,
      steps,
      className,
      children,
      ...props
    },
    ref
  ) {
    const [uncontrolledValue, setUncontrolledValue] = useState<number | string>(
      defaultValue
    );
    const [registeredSteps, setRegisteredSteps] = useState<Array<number | string>>(
      () => cond(Boolean(steps), steps?.map((s) => s.value) ?? [], [])
    );

    const isControlled = controlledValue !== undefined;
    const activeValue = cond(isControlled, controlledValue as number | string, uncontrolledValue);

    const handleValueChange = useCallback(
      (nextValue: number | string) => {
        if (!isControlled) {
          setUncontrolledValue(nextValue);
        }
        onValueChange?.(nextValue);
      },
      [isControlled, onValueChange]
    );

    const registerStep = useCallback((step: number | string) => {
      setRegisteredSteps((prev) => {
        if (prev.includes(step)) return prev;
        return [...prev, step];
      });

      return () => {
        setRegisteredSteps((prev) => prev.filter((s) => s !== step));
      };
    }, []);

    const stepValues = useMemo(
      () => cond(Boolean(steps), steps?.map((s) => s.value) ?? [], registeredSteps),
      [steps, registeredSteps]
    );

    const contextValue = useMemo<StepperContextValue>(
      () => ({
        value: activeValue,
        setValue: handleValueChange,
        orientation,
        variant,
        size,
        linear,
        indicators,
        stepValues,
        registerStep,
      }),
      [
        activeValue,
        handleValueChange,
        orientation,
        variant,
        size,
        linear,
        indicators,
        stepValues,
        registerStep,
      ]
    );

    const isHorizontal = orientation === "horizontal";

    return (
      <StepperContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-slot="stepper"
          data-orientation={orientation}
          data-variant={variant}
          className={cn(
            "w-full",
            cond(isHorizontal, "flex flex-col gap-6", "flex gap-8"),
            className
          )}
          {...props}
        >
          {cond(
            Boolean(steps),
            <>
              <StepperList>
                {steps?.map((stepDef, idx) => (
                  <StepperItem
                    key={stepDef.value}
                    step={stepDef.value}
                    disabled={stepDef.disabled}
                    error={stepDef.error}
                    loading={stepDef.loading}
                  >
                    <StepperTrigger>
                      <StepperIndicator>
                        {stepDef.icon}
                      </StepperIndicator>

                      {when(
                        any(stepDef.title, stepDef.description),
                        <div className="flex flex-col gap-0.5">
                          {when(stepDef.title, <StepperTitle>{stepDef.title}</StepperTitle>)}
                          {when(stepDef.description, (
                            <StepperDescription>
                              {stepDef.description}
                            </StepperDescription>
                          ))}
                        </div>
                      )}
                    </StepperTrigger>

                    {when(
                      any(variant !== "bar", idx < (steps?.length ?? 0) - 1),
                      when(variant !== "bar" && idx < (steps?.length ?? 0) - 1, (
                        <StepperSeparator />
                      ))
                    )}
                  </StepperItem>
                ))}
              </StepperList>

              <div className="w-full">
                {steps?.map((stepDef) => (
                  <StepperView key={stepDef.value} value={stepDef.value}>
                    {stepDef.content}
                  </StepperView>
                ))}
              </div>
            </>,
            children
          )}
        </div>
      </StepperContext.Provider>
    );
  }
) as StepperComponent;

Stepper.displayName = "Stepper";
Stepper.List = StepperList;
Stepper.Item = StepperItem;
Stepper.Trigger = StepperTrigger;
Stepper.Indicator = StepperIndicator;
Stepper.Title = StepperTitle;
Stepper.Description = StepperDescription;
Stepper.Separator = StepperSeparator;
Stepper.View = StepperView;

