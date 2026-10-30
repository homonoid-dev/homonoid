"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useStepperContext } from "./StepperContext";
import type { StepperListProps } from "./types";

export const StepperList = forwardRef<HTMLOListElement, StepperListProps>(
  function StepperList({ className, children, ...props }, ref) {
    const { orientation } = useStepperContext();
    const isHorizontal = orientation === "horizontal";

    return (
      <ol
        ref={ref}
        role="list"
        data-slot="stepper-list"
        data-orientation={orientation}
        className={cn(
          "w-full list-none p-0 m-0",
          cond(
            isHorizontal,
            "flex items-start justify-between gap-6",
            "flex flex-col gap-6"
          ),
          className
        )}
        {...props}
      >
        {children}
      </ol>
    );
  }
);

StepperList.displayName = "StepperList";

