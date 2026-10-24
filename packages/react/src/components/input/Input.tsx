"use client";

import {
  forwardRef,
  useId,
  useRef,
  type MouseEvent
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { any, cond, when } from "../../utils/condition";
import type { InputProps } from "./types";

export const variants = cva(
  "relative w-full inline-flex items-center transform-gpu origin-center transition-[color,background-color,border-color,opacity] duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)]",
  {
    variants: {
      variant: {
        outlined: "border border-border bg-transparent hover:border-foreground/30 focus-within:border-primary focus-within:hover:border-primary",
        contained: "border border-transparent bg-surface hover:bg-surface-hover focus-within:border-primary",
        plain: "border border-transparent bg-transparent hover:bg-surface-hover",
      },
      size: {
        sm: "h-control-sm px-2.5 gap-2 text-xs",
        md: "h-control-md px-3 gap-2.5 text-sm",
        lg: "h-control-lg px-3.5 gap-3 text-base",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
      },
      invalid: {
        true: "border-destructive/30 hover:border-destructive hover:focus-within:border-destructive focus-within:border-destructive",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none bg-surface/50",
        false: "cursor-text",
      },
    },
    compoundVariants: [
      {
        invalid: true,
        variant: "contained",
        className: "border-destructive focus-within:border-destructive bg-destructive/10 hover:bg-destructive/20",
      },
      {
        invalid: true,
        variant: "plain",
        className: "border-transparent hover:border-transparent hover:bg-destructive/20 focus-within:border-transparent focus-within:hover:border-transparent focus-within:ring-transparent",
      },
    ],
    defaultVariants: {
      variant: "outlined",
      size: "md",
      radius: "lg",
      invalid: false,
      disabled: false,
    },
  }
);

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    variant = "outlined",
    size = "md",
    radius = "md",
    label,
    description,
    error,
    invalid = false,
    leading,
    trailing,
    disabled = false,
    className,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const labelId = `${inputId}-label`;
  const descriptionId = `${inputId}-desc`;
  const errorId = `${inputId}-error`;

  const innerRef = useRef<HTMLInputElement | null>(null);
  const isInvalid = any(invalid, Boolean(error));

  const setRefs = (element: HTMLInputElement | null) => {
    innerRef.current = element;
    if (!ref) return;
    if (typeof ref === "function") {
      ref(element);
    } else {
      (ref as React.RefObject<HTMLInputElement | null>).current = element;
    }
  };

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== innerRef.current && !(e.target as HTMLElement).closest("button, a, input")) {
      innerRef.current?.focus();
    }
  };

  // Accessibility bindings
  const userDescribedBy = props["aria-describedby"];
  const describedByParts = [
    userDescribedBy,
    error ? errorId : undefined,
    description ? descriptionId : undefined
  ].filter(Boolean);
  const finalDescribedBy = describedByParts.length > 0 ? describedByParts.join(" ") : undefined;

  const hasLeading = Boolean(leading);
  const hasTrailing = Boolean(trailing);

  const controlContainer = (
    <div
      onClick={handleContainerClick}
      className={cn(
        variants({
          variant,
          size,
          radius,
          invalid: isInvalid,
          disabled,
        }),
        cond(!label && !description && !error, className, undefined)
      )}
    >
      {/* Native Input Element */}
      <input
        ref={setRefs}
        id={inputId}
        disabled={disabled}
        aria-invalid={cond(isInvalid, true, undefined)}
        aria-describedby={finalDescribedBy}
        className={cn(
          "absolute inset-0 w-full h-full rounded-[inherit] bg-transparent outline-none focus:outline-none focus:ring-0 disabled:cursor-not-allowed selection:bg-primary/30 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
          cond(
            hasLeading,
            cond(size === "sm", "pl-8", cond(size === "lg", "pl-11", "pl-9")),
            cond(size === "sm", "pl-2.5", cond(size === "lg", "pl-3.5", "pl-3"))
          ),
          cond(
            hasTrailing,
            cond(size === "sm", "pr-10", cond(size === "lg", "pr-16", "pr-14")),
            cond(size === "sm", "pr-2.5", cond(size === "lg", "pr-3.5", "pr-3"))
          ),
          cond(isInvalid, "text-destructive placeholder:text-destructive/60", "text-foreground placeholder:text-muted")
        )}
        {...props}
      />

      {/* Leading Slot */}
      {when(
        leading,
        <span
          data-slot="input-leading"
          className="relative z-10 inline-flex shrink-0 items-center justify-center pointer-events-none [&_button]:pointer-events-auto [&_a]:pointer-events-auto [&_input]:pointer-events-auto"
        >
          {leading}
        </span>
      )}

      {/* Trailing Slot */}
      {when(
        trailing,
        <span
          data-slot="input-trailing"
          className="relative z-10 ml-auto inline-flex shrink-0 items-center justify-center pointer-events-none [&_button]:pointer-events-auto [&_a]:pointer-events-auto [&_input]:pointer-events-auto"
        >
          {trailing}
        </span>
      )}
    </div>
  );

  // If no label, description, or error message, return the container directly
  if (!label && !description && !error) {
    return controlContainer;
  }

  // Composed layout with label and helper/error captions
  return (
    <div className={cn("w-full flex flex-col gap-1.5 select-none", className)}>
      {when(
        label,
        <label
          id={labelId}
          htmlFor={inputId}
          className={cn(
            "font-medium",
            cond(isInvalid, "text-destructive", "text-foreground"),
            cond(size === "sm", "text-xs", "text-sm"),
            cond(disabled, "opacity-60 cursor-not-allowed", "cursor-pointer")
          )}
        >
          {label}
        </label>
      )}

      {controlContainer}

      {when(
        error,
        <span id={errorId} className="text-xs text-destructive font-medium leading-normal">
          {error}
        </span>
      )}

      {when(
        !error && description,
        <span id={descriptionId} className="text-xs text-muted leading-normal">
          {description}
        </span>
      )}
    </div>
  );
});
