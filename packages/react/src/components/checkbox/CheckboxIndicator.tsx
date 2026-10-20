"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { all, cond } from "../../utils/condition";
import { useCheckboxContext } from "./CheckboxContext";
import type { CheckboxIndicatorProps } from "./types";

export const CheckboxIndicator = forwardRef<HTMLSpanElement, CheckboxIndicatorProps>(
  function CheckboxIndicator({ className, children, ...props }, ref) {
    const { isChecked, isIndeterminate } = useCheckboxContext();

    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 flex items-center justify-center pointer-events-none",
          className
        )}
        {...props}
      >
        {cond(
          Boolean(children),
          children,
          <>
            {/* Checkmark Glyph */}
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className={cn(
                "absolute inset-0 m-auto w-full h-full p-0.5 transition-all duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)]",
                cond(
                  all(isChecked, !isIndeterminate),
                  "opacity-100 scale-100",
                  "opacity-0 scale-75 pointer-events-none"
                )
              )}
            >
              <path
                d="M3.5 8.5L6.5 11.5L12.5 4.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Indeterminate Glyph */}
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className={cn(
                "absolute inset-0 m-auto w-full h-full p-0.5 transition-all duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)]",
                cond(
                  isIndeterminate,
                  "opacity-100 scale-100",
                  "opacity-0 scale-75 pointer-events-none"
                )
              )}
            >
              <path
                d="M3.5 8H12.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </>
        )}
      </span>
    );
  }
);

CheckboxIndicator.displayName = "Checkbox.Indicator";
