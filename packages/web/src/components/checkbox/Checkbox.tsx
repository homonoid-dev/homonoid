import { forwardRef, useEffect, useId, useRef, useState, type ChangeEvent } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { any, all, iff } from "../../utils/condition";
import type { CheckboxProps } from "./types";

export const variants = cva(
  "relative inline-flex items-center justify-center shrink-0 border select-none transform-gpu origin-center transition-[color,background-color,border-color,box-shadow,transform] duration-[var(--motion-duration-fast)] ease-[var(--motion-easing-standard)] active:scale-[0.88] group-active:scale-[0.90] focus-ring",
  {
    variants: {
      size: {
        sm: "w-4 h-4 rounded-sm",
        md: "w-5 h-5 rounded-md",
        lg: "w-6 h-6 rounded-lg"
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-none"
      },
      state: {
        unchecked: "bg-surface border-border text-transparent",
        checked: "bg-primary border-primary text-primary-foreground",
        indeterminate: "bg-primary border-primary text-primary-foreground"
      },
      invalid: {
        true: "border-destructive",
        false: ""
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none active:scale-100 group-active:scale-100",
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
      state: "unchecked",
      invalid: false,
      disabled: false
    }
  }
);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    size = "md",
    shape,
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
  const isChecked = iff(isControlled, checked === true, internalChecked);

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

  const currentState = iff(
    isIndeterminate,
    "indeterminate",
    iff(isChecked, "checked", "unchecked")
  );

  const hasTextContent = any(Boolean(label), Boolean(description));

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group inline-flex items-start gap-2.5 select-none",
        iff(disabled, "cursor-not-allowed opacity-60", "cursor-pointer"),
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
        aria-checked={iff(isIndeterminate, "mixed", isChecked)}
        onChange={handleChange}
        className="sr-only peer"
        {...props}
      />

      {/* Styled Control Container with Object Continuity */}
      <span
        aria-hidden="true"
        className={cn(
          variants({
            size,
            shape,
            state: currentState,
            invalid,
            disabled
          }),
          iff(
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
            "absolute inset-0 m-auto w-full h-full p-0.5",
            iff(
              all(isChecked, !isIndeterminate),
              "opacity-100",
              "opacity-0 pointer-events-none"
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
            "absolute inset-0 m-auto w-full h-full p-0.5",
            iff(
              isIndeterminate,
              "opacity-100",
              "opacity-0 pointer-events-none"
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

      {/* Label and Description */}
      {hasTextContent && (
        <span className="flex flex-col gap-0.5">
          {label && (
            <span
              className={cn(
                "font-medium text-foreground",
                iff(size === "sm", "text-xs leading-4", iff(size === "lg", "text-base leading-6", "text-sm leading-5"))
              )}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              className={cn(
                "text-muted",
                iff(size === "sm", "text-[11px] leading-tight", iff(size === "lg", "text-sm leading-tight", "text-xs leading-tight"))
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
