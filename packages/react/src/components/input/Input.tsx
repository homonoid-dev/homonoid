"use client";

import {
  forwardRef,
  useId,
  useRef,
  type MouseEvent
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { iff } from "../../utils/condition";
import type { InputProps } from "./types";

export const variants = cva(
  "relative w-full inline-flex items-center select-none transform-gpu origin-center transition-[color,background-color,border-color,opacity] duration-[var(--motion-duration-fast)] ease-[var(--motion-easing-standard)]",
  {
    variants: {
      variant: {
        outlined: "border border-border hover:border-foreground/30 focus-within:border-primary focus-within:hover:border-primary focus-within:ring-2 focus-within:ring-primary/30",
        filled: "border border-transparent bg-surface hover:bg-surface-hover focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30",
        plain: "border border-transparent hover:bg-surface-hover"
      },
      size: {
        sm: "h-control-sm px-2.5 text-xs gap-2 rounded-md",
        md: "h-control-md px-3 text-sm gap-2.5 rounded-lg",
        lg: "h-control-lg px-3.5 text-base gap-3 rounded-xl"
      },
      invalid: {
        true: "border-destructive hover:border-destructive hover:focus-within:border-destructive focus-within:border-destructive focus-within:ring-2 focus-within:ring-destructive/30",
        false: ""
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none bg-surface/50",
        false: "cursor-text"
      }
    },
    compoundVariants: [
      {
        invalid: true,
        variant: "filled",
        className: "border-destructive focus-within:border-destructive bg-destructive/10 hover:bg-destructive/20"
      },
      {
        invalid: true,
        variant: "plain",
        className: "border-transparent hover:border-transparent hover:bg-destructive/20 focus-within:border-transparent focus-within:hover:border-transparent focus-within:ring-transparent"
      }
    ],
    defaultVariants: {
      variant: "outlined",
      size: "md",
      invalid: false,
      disabled: false
    }
  }
);

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    variant = "outlined",
    size = "md",
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
  const isInvalid = Boolean(invalid || error);

  const setRefs = (element: HTMLInputElement | null) => {
    innerRef.current = element;
    if (!ref) return;
    if (typeof ref === "function") {
      ref(element);
    } else {
      (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
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

  const controlContainer = (
    <div
      onClick={handleContainerClick}
      className={cn(
        variants({
          variant,
          size,
          invalid: isInvalid,
          disabled
        }),
        iff(!label && !description && !error, className, undefined)
      )}
    >
      {/* Leading Slot */}
      {leading && (
        <span className="inline-flex shrink-0 items-center justify-center">
          {leading}
        </span>
      )}

      {/* Native Input Element */}
      <input
        ref={setRefs}
        id={inputId}
        disabled={disabled}
        aria-invalid={isInvalid ? true : undefined}
        aria-describedby={finalDescribedBy}
        className={cn(
          "w-full h-full bg-transparent outline-none focus:outline-none focus:ring-0 disabled:cursor-not-allowed selection:bg-primary/30",
          iff(isInvalid, "text-destructive placeholder:text-destructive/60", "text-foreground placeholder:text-muted"),
          iff(size === "sm", "text-xs", undefined),
          iff(size === "md", "text-sm", undefined),
          iff(size === "lg", "text-base", undefined)
        )}
        {...props}
      />

      {/* Trailing Slot */}
      {trailing && (
        <span className="inline-flex shrink-0 items-center justify-center">
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
      {label && (
        <label
          id={labelId}
          htmlFor={inputId}
          className={cn(
            "font-medium",
            isInvalid ? "text-destructive" : "text-foreground",
            iff(size === "sm", "text-xs", "text-sm"),
            iff(disabled, "opacity-60 cursor-not-allowed", "cursor-pointer")
          )}
        >
          {label}
        </label>
      )}

      {controlContainer}

      {error && (
        <span id={errorId} className="text-xs text-destructive font-medium leading-normal">
          {error}
        </span>
      )}

      {!error && description && (
        <span id={descriptionId} className="text-xs text-muted leading-normal">
          {description}
        </span>
      )}
    </div>
  );
});
