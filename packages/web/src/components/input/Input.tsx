import {
  forwardRef,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { iff } from "../../utils/condition";
import type { InputProps } from "./types";

export const variants = cva(
  "relative w-full inline-flex items-center select-none transform-gpu origin-center transition-[color,background-color,border-color,box-shadow,opacity] duration-[var(--motion-duration-fast)] ease-[var(--motion-easing-standard)]",
  {
    variants: {
      variant: {
        outlined: "border border-border focus-within:border-primary",
        filled: "border border-transparent bg-surface focus-within:bg-background focus-within:border-primary",
        plain: "border border-transparent bg-transparent focus-within:bg-surface focus-within:border-transparent focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary/50"
      },
      size: {
        sm: "h-control-sm px-2.5 text-xs gap-2 rounded-md",
        md: "h-control-md px-3 text-sm gap-2.5 rounded-lg",
        lg: "h-control-lg px-3.5 text-base gap-3 rounded-xl"
      },
      invalid: {
        true: "border-destructive hover:border-destructive focus-within:border-destructive focus-within:ring-destructive/50",
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
        className:
          "border-destructive hover:border-destructive focus-within:border-destructive focus-within:ring-destructive/50 bg-destructive/5"
      },
      {
        invalid: true,
        variant: "plain",
        className:
          "border-destructive hover:border-destructive focus-within:border-destructive focus-within:ring-destructive/50"
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
    clearable = false,
    onClear,
    disabled = false,
    className,
    containerClassName,
    value,
    defaultValue,
    onChange,
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

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | number | readonly string[]>(
    defaultValue ?? ""
  );

  const currentValue = isControlled ? value : internalValue;
  const hasValue = String(currentValue ?? "").length > 0;
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isControlled) {
      setInternalValue("");
    }

    if (innerRef.current) {
      innerRef.current.value = "";
      const inputEvent = new Event("input", { bubbles: true });
      innerRef.current.dispatchEvent(inputEvent);
      innerRef.current.focus();
    }

    onClear?.();
  };

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== innerRef.current && !(e.target as HTMLElement).closest("button")) {
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
        containerClassName,
        iff(!label && !description && !error, className, undefined)
      )}
    >
      {/* Leading Adornment */}
      {leading && (
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex shrink-0 items-center justify-center text-muted pointer-events-none select-none",
            iff(size === "sm", "w-3.5 h-3.5 [&>svg]:w-3.5 [&>svg]:h-3.5", undefined),
            iff(size === "md", "w-4 h-4 [&>svg]:w-4 [&>svg]:h-4", undefined),
            iff(size === "lg", "w-5 h-5 [&>svg]:w-5 [&>svg]:h-5", undefined)
          )}
        >
          {leading}
        </span>
      )}

      {/* Native Input Element */}
      <input
        ref={setRefs}
        id={inputId}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        aria-invalid={isInvalid ? true : undefined}
        aria-describedby={finalDescribedBy}
        onChange={handleChange}
        className={cn(
          "w-full h-full bg-transparent text-foreground placeholder:text-muted outline-none focus:outline-none focus:ring-0 disabled:cursor-not-allowed selection:bg-primary/20",
          iff(size === "sm", "text-xs", undefined),
          iff(size === "md", "text-sm", undefined),
          iff(size === "lg", "text-base", undefined)
        )}
        {...props}
      />

      {/* Interactive Clear Button */}
      {clearable && hasValue && !disabled && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Clear input"
          onClick={handleClear}
          className="inline-flex shrink-0 items-center justify-center rounded-sm p-0.5 text-muted hover:text-foreground hover:bg-surface-active transition-[color,background-color,transform] duration-[var(--motion-duration-fast)] active:scale-95 cursor-pointer focus:outline-none"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5"
            aria-hidden="true"
          >
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      )}

      {/* Trailing Adornment */}
      {trailing && (
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex shrink-0 items-center justify-center text-muted select-none",
            iff(size === "sm", "w-3.5 h-3.5 [&>svg]:w-3.5 [&>svg]:h-3.5", undefined),
            iff(size === "md", "w-4 h-4 [&>svg]:w-4 [&>svg]:h-4", undefined),
            iff(size === "lg", "w-5 h-5 [&>svg]:w-5 [&>svg]:h-5", undefined)
          )}
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
      {label && (
        <label
          id={labelId}
          htmlFor={inputId}
          className={cn(
            "font-medium text-foreground",
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
