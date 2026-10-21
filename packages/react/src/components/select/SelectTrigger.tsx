"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { useMergeRefs } from "@floating-ui/react";
import { useSelectContext } from "./SelectContext";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { SelectTriggerProps } from "./types";

export const variants = cva(
  "relative inline-flex w-full select-none items-center justify-between overflow-hidden text-left font-normal subpixel-antialiased transition duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] active:scale-[var(--motion-press-scale)] data-[state=open]:scale-[var(--motion-press-scale)] focus-ring cursor-pointer disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
  {
    variants: {
      variant: {
        outlined:
          "border-[0.5px] border-border bg-transparent hover:border-foreground/30",
        contained: "bg-surface hover:bg-surface-hover",
        plain: "bg-transparent hover:bg-surface-hover",
      },
      color: {
        surface: "text-foreground",
        subtle: "text-subtle-foreground",
        primary: "text-primary",
        destructive: "text-destructive",
      },
      size: {
        sm: "h-control-sm px-2.5 text-xs gap-2",
        md: "h-control-md px-3 text-sm gap-2.5",
        lg: "h-control-lg px-3.5 text-base gap-3",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      invalid: {
        true: "border-destructive focus-visible:ring-destructive/50 text-destructive",
        false: "",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50 pointer-events-none",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "contained",
        color: "primary",
        className: "bg-primary/15 hover:bg-primary/20",
      },
      {
        variant: "contained",
        color: "destructive",
        className: "bg-destructive/15 hover:bg-destructive/20",
      },
      {
        variant: "contained",
        color: "subtle",
        className: "bg-primary/10 hover:bg-primary/15",
      },
      {
        variant: "outlined",
        color: "primary",
        className: "border-primary-border",
      },
      {
        variant: "outlined",
        color: "destructive",
        className: "border-destructive-border",
      },
      {
        variant: "outlined",
        color: "subtle",
        className: "border-subtle-border",
      },
    ],
    defaultVariants: {
      variant: "outlined",
      color: "surface",
      size: "md",
      radius: "lg",
      invalid: false,
      disabled: false,
    },
  }
);

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger({ children, className, ...props }, ref) {
    const {
      open,
      triggerId,
      listboxId,
      disabled,
      invalid,
      size,
      radius,
      variant,
      color,
      setReference,
      getReferenceProps,
    } = useSelectContext();

    const mergedRef = useMergeRefs([setReference, ref]);

    const ariaProps = {
      id: triggerId,
      role: "combobox",
      "aria-expanded": open,
      "aria-haspopup": "listbox" as const,
      "aria-controls": cond(open, listboxId, undefined),
      "data-state": cond(open, "open", "closed"),
      disabled,
    };

    return (
      <button
        ref={mergedRef as React.Ref<HTMLButtonElement>}
        type="button"
        className={cn(
          variants({
            variant,
            color,
            size,
            radius,
            invalid,
            disabled,
          }),
          className
        )}
        {...getReferenceProps({
          ...ariaProps,
          ...props,
        })}
      >
        {children}
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={cn(
            "size-4 shrink-0 transition-transform duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] text-muted",
            cond(open, "rotate-180", "rotate-0")
          )}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  }
);

SelectTrigger.displayName = "Select.Trigger";
