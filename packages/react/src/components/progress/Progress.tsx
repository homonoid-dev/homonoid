import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond, any } from "../../utils/condition";
import type { ProgressProps } from "./types";

export const circularVariants = cva(
  "relative inline-flex items-center justify-center shrink-0 select-none transform-gpu origin-center",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
      },
      color: {
        current: "text-current",
        primary: "text-primary",
        subtle: "text-subtle-foreground",
        surface: "text-foreground",
        destructive: "text-destructive",
      },
    },
    defaultVariants: {
      size: "md",
      color: "primary",
    },
  }
);

export const linearVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-surface-hover select-none",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
      },
      color: {
        current: "[&>[data-slot='indicator']]:bg-current",
        primary: "[&>[data-slot='indicator']]:bg-primary",
        subtle: "[&>[data-slot='indicator']]:bg-subtle-foreground",
        surface: "[&>[data-slot='indicator']]:bg-foreground",
        destructive: "[&>[data-slot='indicator']]:bg-destructive",
      },
    },
    defaultVariants: {
      size: "md",
      color: "primary",
    },
  }
);

const CIRCUMFERENCE = 59.69;

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    value,
    min = 0,
    max = 100,
    variant = "circular",
    size = "md",
    color = "primary",
    label = "Progress",
    valueText,
    className,
    "aria-label": ariaLabel,
    "aria-hidden": ariaHidden,
    ...props
  },
  ref
) {
  const isHidden = any(ariaHidden === true, ariaHidden === "true");
  const isDeterminate = typeof value === "number";
  const safeRange = Math.max(0.0001, max - min);
  const normalizedValue = cond(isDeterminate, Math.min(max, Math.max(min, value!)), 0);
  const percentage = cond(isDeterminate, ((normalizedValue - min) / safeRange) * 100, 0);

  const resolvedValueText = valueText ?? cond(isDeterminate, `${Math.round(percentage)}%`, undefined);
  const strokeOffset = CIRCUMFERENCE * (1 - percentage / 100);

  if (variant === "linear") {
    return (
      <div
        ref={ref}
        role={cond(isHidden, undefined, "progressbar")}
        aria-label={cond(isHidden, undefined, ariaLabel ?? label)}
        aria-valuenow={cond(isDeterminate, Math.round(percentage), undefined)}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={resolvedValueText}
        aria-hidden={ariaHidden}
        data-slot="progress"
        data-variant="linear"
        data-indeterminate={cond(!isDeterminate, "true", undefined)}
        className={cn(linearVariants({ size, color }), className)}
        {...props}
      >
        <div
          data-slot="indicator"
          className={cn(
            "h-full rounded-full",
            cond(
              isDeterminate,
              "transition-[width] duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)]",
              "w-1/3 animate-progress-indeterminate"
            )
          )}
          style={cond(isDeterminate, { width: `${percentage}%` }, undefined)}
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role={cond(isHidden, undefined, "progressbar")}
      aria-label={cond(isHidden, undefined, ariaLabel ?? label)}
      aria-valuenow={cond(isDeterminate, Math.round(percentage), undefined)}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuetext={resolvedValueText}
      aria-hidden={ariaHidden}
      data-slot="progress"
      data-variant="circular"
      data-indeterminate={cond(!isDeterminate, "true", undefined)}
      className={cn(circularVariants({ size, color }), className)}
      {...props}
    >
      <svg
        className={cn(
          "w-full h-full -rotate-90 origin-center",
          cond(!isDeterminate, "animate-spinner-border", "")
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="9.5"
          stroke="currentColor"
          strokeWidth="2.5"
          className="opacity-20"
        />
        <circle
          cx="12"
          cy="12"
          r="9.5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={cond(isDeterminate, strokeOffset, CIRCUMFERENCE * 0.75)}
          className={cond(
            isDeterminate,
            "transition-[stroke-dashoffset] duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)]",
            ""
          )}
        />
      </svg>
    </div>
  );
});

Progress.displayName = "Progress";

