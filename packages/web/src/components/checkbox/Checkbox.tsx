import { forwardRef, useEffect, useId, useRef, useState, type ChangeEvent } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { any, all } from "../../utils/condition";
import type { CheckboxProps } from "./types";

export const boxVariants = cva(
  "relative inline-flex items-center justify-center shrink-0 border select-none transform-gpu origin-center transition-[color,background-color,border-color,box-shadow,transform] duration-[var(--motion-duration-fast)] ease-[var(--motion-easing-standard)] active:scale-[var(--motion-press-scale)] focus-ring",
  {
    variants: {
      size: {
        sm: "w-4 h-4 rounded-sm",
        md: "w-5 h-5 rounded-md",
        lg: "w-6 h-6 rounded-lg"
      },
      state: {
        unchecked: "bg-surface border-border text-transparent",
        checked: "bg-primary border-primary text-primary-foreground",
        indeterminate: "bg-primary border-primary text-primary-foreground"
      },
      invalid: {
        true: "border-destructive focus-visible:ring-destructive/50"
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none active:scale-100",
        false: "cursor-pointer"
      }
    },
    defaultVariants: {
      size: "md",
      state: "unchecked",
      disabled: false
    }
  }
);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    size = "md",
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
  const innerRef = useRef<HTMLInputElement | null>(null);

  const [internalChecked, setInternalChecked] = useState(Boolean(defaultChecked));
  const isControlled = checked !== undefined;

  const isIndeterminate = any(checked === "indeterminate", Boolean(indeterminate));
  const isChecked = isControlled ? checked === true : internalChecked;

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

  const currentState = isIndeterminate
    ? "indeterminate"
    : isChecked
      ? "checked"
      : "unchecked";

  const hasTextContent = any(Boolean(label), Boolean(description));

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "inline-flex items-start gap-2.5 select-none",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className
      )}
    >
      {/* Hidden Native Input preserving browser semantics and keyboard bindings */}
      <input
        ref={setRefs}
        id={inputId}
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        aria-invalid={invalid}
        aria-checked={isIndeterminate ? "mixed" : isChecked}
        onChange={handleChange}
        className="sr-only peer"
        {...props}
      />

      {/* Styled Control Container with Object Continuity */}
      <span
        aria-hidden="true"
        className={cn(
          boxVariants({
            size,
            state: currentState,
            invalid,
            disabled
          }),
          "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50"
        )}
      >
        {/* Checkmark Glyph */}
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={cn(
            "w-full h-full p-0.5 checkbox-glyph transform-gpu",
            all(isChecked, !isIndeterminate)
              ? "scale-100 opacity-100"
              : "scale-50 opacity-0 absolute"
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
            "w-full h-full p-0.5 checkbox-glyph transform-gpu",
            isIndeterminate
              ? "scale-100 opacity-100"
              : "scale-50 opacity-0 absolute"
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

      {/* Label and Description */}
      {hasTextContent && (
        <span className="flex flex-col gap-0.5 pt-px">
          {label && (
            <span
              className={cn(
                "font-medium text-foreground leading-tight",
                size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
              )}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              className={cn(
                "text-muted leading-tight",
                size === "sm" ? "text-[11px]" : size === "lg" ? "text-sm" : "text-xs"
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
