"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useCheckboxContext } from "./CheckboxContext";
import { CheckboxIndicator } from "./CheckboxIndicator";
import type { CheckboxControlProps } from "./types";

export const variants = cva(
  "relative inline-flex items-center justify-center shrink-0 border select-none transition duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] active:scale-[var(--motion-press-scale)] peer-active:scale-[var(--motion-press-scale)] group-active:scale-[var(--motion-press-scale)] focus-ring",
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      state: {
        unchecked: "border-border text-transparent",
        checked: "bg-primary border-primary text-primary-foreground",
        indeterminate: "bg-primary border-primary text-primary-foreground",
      },
      invalid: {
        true: "border-destructive",
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
        state: "checked",
        className: "bg-destructive border-destructive text-destructive-foreground",
      },
      {
        invalid: true,
        state: "indeterminate",
        className: "bg-destructive border-destructive text-destructive-foreground",
      },
    ],
    defaultVariants: {
      size: "md",
      radius: "md",
      state: "unchecked",
      invalid: false,
      disabled: false,
    },
  }
);

export const CheckboxControl = forwardRef<HTMLSpanElement, CheckboxControlProps>(
  function CheckboxControl({ className, children, ...props }, ref) {
    const {
      inputId,
      isChecked,
      isIndeterminate,
      currentState,
      disabled,
      invalid,
      size,
      radius,
      inputRef,
      inputProps,
      handleChange,
    } = useCheckboxContext();

    return (
      <span
        ref={ref}
        className={cn("relative shrink-0 inline-flex", className)}
        {...props}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          aria-invalid={invalid}
          aria-checked={cond(isIndeterminate, "mixed", isChecked)}
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
            variants({
              size,
              radius,
              state: currentState,
              invalid,
              disabled,
            }),
            cond(
              invalid,
              "peer-focus-visible:ring-2 peer-focus-visible:ring-destructive/50",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50"
            )
          )}
        >
          {cond(Boolean(children), children, <CheckboxIndicator />)}
        </span>
      </span>
    );
  }
);

CheckboxControl.displayName = "Checkbox.Control";
