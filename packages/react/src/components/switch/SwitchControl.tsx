"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useSwitchContext } from "./SwitchContext";
import { SwitchThumb } from "./SwitchThumb";
import type { SwitchControlProps } from "./types";

export const trackVariants = cva(
  "relative inline-flex items-center shrink-0 select-none transition-colors duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] active:scale-[var(--motion-press-scale)] peer-active:scale-[var(--motion-press-scale)] group-active:scale-[var(--motion-press-scale)] focus-ring",
  {
    variants: {
      size: {
        sm: "w-8 h-5 p-0.5",
        md: "w-11 h-6 p-0.5",
        lg: "w-14 h-8 p-1",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      checked: {
        true: "bg-primary",
        false: "bg-muted/20 ring-1 ring-inset ring-border hover:bg-muted/30",
      },
      invalid: {
        true: "ring-1 ring-inset ring-destructive",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none active:scale-100 peer-active:scale-100 group-active:scale-100",
        false: "cursor-pointer",
      },
    },
    compoundVariants: [
      {
        invalid: true,
        checked: true,
        className: "bg-destructive ring-1 ring-inset ring-destructive",
      },
      {
        invalid: true,
        checked: false,
        className: "bg-destructive/10 ring-1 ring-inset ring-destructive hover:bg-destructive/15",
      },
    ],
    defaultVariants: {
      size: "md",
      radius: "full",
      checked: false,
      invalid: false,
      disabled: false,
    },
  }
);

export const SwitchControl = forwardRef<HTMLSpanElement, SwitchControlProps>(
  function SwitchControl({ className, children, ...props }, ref) {
    const {
      inputId,
      isChecked,
      disabled,
      invalid,
      size,
      radius,
      inputRef,
      inputProps,
      handleChange,
    } = useSwitchContext();

    return (
      <span
        ref={ref}
        className={cn("relative shrink-0 inline-flex items-center", className)}
        {...props}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="checkbox"
          role="switch"
          checked={isChecked}
          disabled={disabled}
          aria-invalid={invalid}
          onChange={handleChange}
          className={cn(
            "peer absolute inset-0 w-full h-full opacity-0 z-10 m-0 p-0 rounded-[inherit]",
            cond(disabled, "cursor-not-allowed", "cursor-pointer")
          )}
          {...inputProps}
        />
        <span
          aria-hidden="true"
          className={cn(
            trackVariants({ size, radius, checked: isChecked, invalid, disabled }),
            cond(
              invalid,
              "peer-focus-visible:ring-2 peer-focus-visible:ring-destructive/50",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50"
            )
          )}
        >
          {cond(Boolean(children), children, <SwitchThumb />)}
        </span>
      </span>
    );
  }
);

SwitchControl.displayName = "Switch.Control";
