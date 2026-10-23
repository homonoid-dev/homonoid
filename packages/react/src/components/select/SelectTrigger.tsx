"use client";

import { forwardRef, type MouseEvent } from "react";
import { cva } from "class-variance-authority";
import { useMergeRefs } from "@floating-ui/react";
import { useSelectContext } from "./SelectContext";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { SelectTriggerProps } from "./types";

const PALETTES = {
  surface: {
    contained:
      "bg-surface text-foreground hover:bg-surface-hover active:bg-surface-hover aria-expanded:bg-surface-hover data-[state=open]:bg-surface-hover",
    outlined:
      "border-[0.5px] border-border text-foreground hover:bg-surface-hover active:bg-surface-hover aria-expanded:bg-surface-hover data-[state=open]:bg-surface-hover",
    plain:
      "text-foreground hover:bg-surface-hover active:bg-surface-hover aria-expanded:bg-surface-hover data-[state=open]:bg-surface-hover",
  },
  subtle: {
    contained:
      "bg-subtle text-subtle-foreground hover:bg-subtle-hover active:bg-subtle-hover aria-expanded:bg-subtle-hover data-[state=open]:bg-subtle-hover",
    outlined:
      "border-[0.5px] border-subtle-border text-subtle-foreground hover:bg-subtle-hover active:bg-subtle-hover aria-expanded:bg-subtle-hover data-[state=open]:bg-subtle-hover",
    plain:
      "text-subtle-foreground hover:bg-subtle-hover active:bg-subtle-hover aria-expanded:bg-subtle-hover data-[state=open]:bg-subtle-hover",
  },
  primary: {
    contained:
      "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-hover aria-expanded:bg-primary-hover data-[state=open]:bg-primary-hover",
    outlined:
      "border-[0.5px] border-primary-border text-primary hover:bg-subtle active:bg-subtle aria-expanded:bg-subtle data-[state=open]:bg-subtle",
    plain:
      "text-primary hover:bg-subtle active:bg-subtle aria-expanded:bg-subtle data-[state=open]:bg-subtle",
  },
  destructive: {
    contained:
      "bg-destructive text-destructive-foreground hover:bg-destructive-hover active:bg-destructive-hover aria-expanded:bg-destructive-hover data-[state=open]:bg-destructive-hover",
    outlined:
      "border-[0.5px] border-destructive-border text-destructive hover:bg-destructive-hover/5 active:bg-destructive-hover/5 aria-expanded:bg-destructive-hover/5 data-[state=open]:bg-destructive-hover/5",
    plain:
      "text-destructive hover:bg-destructive-hover/5 active:bg-destructive-hover/5 aria-expanded:bg-destructive-hover/5 data-[state=open]:bg-destructive-hover/5",
  },
} as const;

type Palette = keyof typeof PALETTES;

const compounds = (Object.keys(PALETTES) as Palette[]).flatMap((color) => [
  { variant: "contained" as const, color, className: PALETTES[color].contained },
  { variant: "outlined" as const, color, className: PALETTES[color].outlined },
  { variant: "plain" as const, color, className: PALETTES[color].plain },
]);

export const variants = cva(
  "relative inline-flex w-full select-none items-center justify-between overflow-hidden text-left font-normal subpixel-antialiased transition duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] active:scale-[var(--motion-press-scale)] aria-expanded:scale-[var(--motion-press-scale)] data-[state=open]:scale-[var(--motion-press-scale)] focus-ring cursor-pointer disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
  {
    variants: {
      variant: {
        contained: "",
        outlined: "bg-transparent",
        plain: "bg-transparent",
      },
      color: {
        surface: "",
        subtle: "",
        primary: "",
        destructive: "",
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
    compoundVariants: compounds,
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
      labelId,
      descriptionId,
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
      "aria-labelledby": labelId,
      "aria-describedby": descriptionId,
      "data-state": cond(open, "open", "closed"),
      disabled,
      "aria-disabled": cond(disabled, true, undefined),
    };

    return (
      <button
        ref={mergedRef as React.Ref<HTMLButtonElement>}
        type="button"
        id={triggerId}
        disabled={disabled}
        aria-disabled={cond(disabled, true, undefined)}
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
          onClick(event: MouseEvent<HTMLButtonElement>) {
            if (disabled) {
              event.preventDefault();
              event.stopPropagation();
              return;
            }
            props.onClick?.(event);
          },
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
