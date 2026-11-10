"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { cond, match } from "../../utils/condition";
import { useStepperContext } from "./StepperContext";
import type { StepperListProps } from "./types";

export const StepperList = forwardRef<HTMLOListElement, StepperListProps>(
  function StepperList({ className, children, ...props }, ref) {
    const { orientation, placement, variant, size } = useStepperContext();
    const isHorizontal = orientation === "horizontal";
    const isBar = variant === "bar";

    const barGapClass = match(
      size,
      {
        sm: "gap-2",
        md: "gap-3",
        lg: "gap-4",
      },
      "gap-3"
    );

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
            cond(
              isBar,
              cn("flex items-start justify-between", barGapClass),
              cond(
                placement === "inline",
                "flex items-center justify-between",
                "flex items-start justify-between"
              )
            ),
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

