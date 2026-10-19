"use client";

import { forwardRef, useEffect, useId, useRef, useState, type ChangeEvent } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { any, all, cond, when } from "../../utils/condition";
import type { CheckboxProps } from "./types";

export const variants = cva(
  "relative inline-flex items-center justify-center shrink-0 border select-none transition duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] active:scale-[var(--motion-press-scale)] peer-active:scale-[var(--motion-press-scale)] group-active:scale-[var(--motion-press-scale)] focus-ring",
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6"
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full"
      },
      state: {
        unchecked: "border-border text-transparent",
        checked: "bg-primary border-primary text-primary-foreground",
        indeterminate: "bg-primary border-primary text-primary-foreground"
      },
      invalid: {
        true: "border-destructive",
        false: ""
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none active:scale-100 peer-active:scale-100 group-active:scale-100",
        false: "cursor-pointer"
      }
    },
    compoundVariants: [
      {
        invalid: true,
        state: "checked",
        className: "bg-destructive border-destructive text-destructive-foreground"
      },
      {
        invalid: true,
        state: "indeterminate",
        className: "bg-destructive border-destructive text-destructive-foreground"
      }
    ],
    defaultVariants: {
      size: "md",
      radius: "md",
      state: "unchecked",
      invalid: false,
      disabled: false
    }
  }
);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    size = "md",
    radius = "md",
    checked,
    defaultChecked = false,
    indeterminate = false,
    disabled = false,
    invalid = false,
    label,
    description,
    onChange,
    className,
    id,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const labelId = `${inputId}-label`;
  const descriptionId = `${inputId}-desc`;
  const innerRef = useRef<HTMLInputElement | null>(null);

  const [internalChecked, setInternalChecked] = useState(Boolean(defaultChecked));
  const isControlled = checked !== undefined;

  const isIndeterminate = any(checked === "indeterminate", Boolean(indeterminate));
  const isChecked = cond(isControlled, checked === true, internalChecked);

  // Sync indeterminate property directly with the native DOM input
  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const setRefs = (element: HTMLInputElement | null) => {
    innerRef.current = element;
    if (typeof ref === "function") {
      ref(element);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const nextChecked = event.target.checked;
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }
    onChange?.(nextChecked);
  };

  const currentState = cond(
    isIndeterminate,
    "indeterminate",
    cond(isChecked, "checked", "unchecked")
  );

  const hasTextContent = any(Boolean(label), Boolean(description));
  const isStringLabel = typeof label === "string";
  const finalAriaLabel = props["aria-label"] || (isStringLabel ? label : undefined);
  const finalAriaLabelledBy = props["aria-labelledby"] || (!isStringLabel && Boolean(label) ? labelId : undefined);

  const userDescribedBy = props["aria-describedby"];
  const finalDescribedBy = cond(
    Boolean(userDescribedBy),
    cond(Boolean(description), `${userDescribedBy} ${descriptionId}`, userDescribedBy),
    cond(Boolean(description), descriptionId, undefined)
  );

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group inline-flex items-start gap-2.5 select-none w-fit",
        cond(disabled, "cursor-not-allowed opacity-60", "cursor-pointer"),
        className
      )}
    >
      {/* Accessible Control Wrapper matching VoiceOver and screen reader focus frame */}
      <span className="relative shrink-0 inline-flex">
        <input
          ref={setRefs}
          id={inputId}
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          aria-invalid={invalid}
          aria-label={finalAriaLabel}
          aria-labelledby={finalAriaLabelledBy}
          aria-describedby={finalDescribedBy}
          aria-checked={cond(isIndeterminate, "mixed", isChecked)}
          onChange={handleChange}
          className={cn(
            "peer absolute inset-0 w-full h-full opacity-0 z-10 m-0 p-0 rounded-[inherit]",
            cond(disabled, "cursor-not-allowed", "cursor-pointer")
          )}
          {...props}
        />

        {/* Styled Control Container with Object Continuity */}
        <span
          aria-hidden="true"
          className={cn(
            variants({
              size,
              radius,
              state: currentState,
              invalid,
              disabled
            }),
            cond(
              invalid,
              "peer-focus-visible:ring-2 peer-focus-visible:ring-destructive/50",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50"
            )
          )}
        >
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
        </span>
      </span>

      {/* Label and Description - hidden from screen reader cursor buffer since announced with input */}
      {when(
        hasTextContent,
        <span aria-hidden="true" className="flex flex-col gap-0.5">
          {when(
            label,
            <span
              id={labelId}
              className={cn(
                "font-medium text-foreground",
                cond(size === "sm", "text-xs leading-4", cond(size === "lg", "text-base leading-6", "text-sm leading-5"))
              )}
            >
              {label}
            </span>
          )}
          {when(
            description,
            <span
              id={descriptionId}
              className={cn(
                "text-muted",
                cond(size === "sm", "text-[11px] leading-tight", cond(size === "lg", "text-sm leading-tight", "text-xs leading-tight"))
              )}
            >
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = "Checkbox";
