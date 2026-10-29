"use client";

import {
  forwardRef,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type MouseEvent
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { all, any, cond, match, when } from "../../utils/condition";
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
    floating = false,
    floatingLabel = false,
    floatingLabelClassName,
    description,
    error,
    invalid = false,
    leading,
    trailing,
    disabled = false,
    className,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    ...props
  },
  ref
) {
  const isFloating = any(floating, floatingLabel);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [isFocused, setIsFocused] = useState(false);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const currentValue = cond(isControlled, value, internalValue);
  const isDateType = any(
    props.type === "date",
    props.type === "time",
    props.type === "datetime-local",
    props.type === "month",
    props.type === "week"
  );
  const hasValue = any(
    currentValue !== undefined && currentValue !== null && currentValue !== "",
    Boolean(innerRef.current?.value),
    isDateType
  );
  const isFloated = any(isFocused, hasValue);

  // Accessibility bindings
  const userDescribedBy = props["aria-describedby"];
  const describedByParts = [
    userDescribedBy,
    error ? errorId : undefined,
    description ? descriptionId : undefined
  ].filter(Boolean);
  const finalDescribedBy = describedByParts.length > 0 ? describedByParts.join(" ") : undefined;

  const floatingLabelBg = cond(
    Boolean(floatingLabelClassName),
    floatingLabelClassName,
    match(
      variant,
      {
        contained: "bg-surface",
        outlined: "bg-background",
        plain: "bg-transparent",
      },
      "bg-background"
    )
  );

  const floatingLabelColor = cond(
    isInvalid,
    "text-destructive",
    cond(isFocused, "text-primary", "text-muted")
  );

  const restingLabelSize = match(
    size,
    {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    "text-sm"
  );

  const floatingLabelElement = when(
    all(isFloating, Boolean(label)),
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none z-10 flex items-center",
        "transform-gpu transition-transform duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)] motion-reduce:transition-none",
        cond(isFloated, "-translate-y-1/2", "translate-y-0")
      )}
    >
      <label
        id={labelId}
        htmlFor={inputId}
        data-slot="input-floating-label"
        data-floated={cond(isFloated, "true", "false")}
        className={cn(
          "inline-flex items-center -ml-1 px-1 rounded-xs truncate font-medium leading-normal origin-left",
          "transform-gpu subpixel-antialiased",
          "transition-[transform,color,background-color] duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)] motion-reduce:transition-none",
          restingLabelSize,
          floatingLabelColor,
          cond(
            isFloated,
            cn("scale-85", floatingLabelBg),
            "scale-100 bg-transparent"
          ),
          cond(disabled, "opacity-50", undefined)
        )}
      >
        {label}
        {when(
          props.required,
          <span className="text-destructive ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
    </div>
  );

  const inputElement = (
    <input
      ref={setRefs}
      id={inputId}
      disabled={disabled}
      aria-invalid={cond(isInvalid, true, undefined)}
      aria-describedby={finalDescribedBy}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={cond(isFloating, cond(isFloated, placeholder, undefined), placeholder)}
      className={cn(
        cond(!isFloating, "order-2 flex-1", "w-full h-full"),
        "min-w-0 bg-transparent outline-none focus:outline-none focus:ring-0 disabled:cursor-not-allowed selection:bg-primary/30 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
        cond(
          isInvalid,
          "text-destructive placeholder:text-destructive/60",
          "text-foreground placeholder:text-muted"
        )
      )}
      {...props}
    />
  );

  const hasExternalLabel = all(!isFloating, Boolean(label));
  const hasFooter = any(Boolean(error), Boolean(description));
  const needsOuterWrapper = any(hasExternalLabel, hasFooter);

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
        cond(!needsOuterWrapper, className, undefined)
      )}
    >
      {/* Native Input Element / Floating Slot */}
      {cond(
        isFloating,
        <div className="relative order-2 flex-1 min-w-0 flex items-center h-full">
          {inputElement}
          {floatingLabelElement}
        </div>,
        inputElement
      )}

      {/* Leading Slot */}
      {when(
        leading,
        <span
          data-slot="input-leading"
          className="order-1 inline-flex shrink-0 items-center justify-center pointer-events-none [&_button]:pointer-events-auto [&_a]:pointer-events-auto [&_input]:pointer-events-auto"
        >
          {leading}
        </span>
      )}

      {/* Trailing Slot */}
      {when(
        trailing,
        <span
          data-slot="input-trailing"
          className="order-3 inline-flex shrink-0 items-center justify-center pointer-events-none [&_button]:pointer-events-auto [&_a]:pointer-events-auto [&_input]:pointer-events-auto"
        >
          {trailing}
        </span>
      )}
    </div>
  );

  // If no external label and no footer (description or error), return control container directly
  if (!needsOuterWrapper) {
    return controlContainer;
  }

  // Composed layout with external label and helper/error captions
  return (
    <div className={cn("w-full flex flex-col gap-1.5 select-none", className)}>
      {when(
        hasExternalLabel,
        <label
          id={labelId}
          htmlFor={inputId}
          className={cn(
            "font-medium",
            cond(isInvalid, "text-destructive", "text-foreground"),
            match(size, { sm: "text-[11px]", md: "text-xs", lg: "text-sm" }, "text-xs"),
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
