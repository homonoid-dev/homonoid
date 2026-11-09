"use client";

import {
  forwardRef,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type MouseEvent,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { all, any, cond, match, when } from "../../utils/condition";
import { useInputNotchedOutline } from "./useInputNotchedOutline";
import { InputNotchedOutline } from "./InputNotchedOutline";
import { InputFloatingLabel } from "./InputFloatingLabel";
import type { InputProps } from "./types";

export const variants = cva(
  "relative w-full inline-flex items-center transform-gpu origin-center transition-[color,background-color,border-color,opacity] duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)]",
  {
    variants: {
      variant: {
        outlined: "border border-transparent bg-transparent",
        contained: "border border-transparent bg-surface hover:bg-surface-hover focus-within:border-primary",
        plain: "border border-transparent bg-transparent hover:bg-surface-hover",
      },
      size: {
        sm: "h-control-sm px-control-sm-x gap-control-gap text-xs",
        md: "h-control-md px-control-md-x gap-control-gap text-sm",
        lg: "h-control-lg px-control-lg-x gap-control-gap text-base",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
      },
      invalid: {
        true: "",
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
        variant: "outlined",
        className: "border-transparent hover:border-transparent focus-within:border-transparent",
      },
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

const DATE_INPUT_TYPES = new Set([
  "date",
  "time",
  "datetime-local",
  "month",
  "week",
]);

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    variant = "outlined",
    size = "md",
    radius = "md",
    label,
    floating = false,
    floatingLabel = false,
    floatingLabelClassName: _floatingLabelClassName,
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
  const isFloating = all(any(floating, floatingLabel), Boolean(label));
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

  const currentValue = cond(isControlled, value, internalValue);
  const isDateType = Boolean(props.type && DATE_INPUT_TYPES.has(props.type));
  const hasValue = any(
    currentValue !== undefined && currentValue !== null && currentValue !== "",
    Boolean(innerRef.current?.value),
    isDateType
  );
  const isExpanded = props["aria-expanded"] === true || props["aria-expanded"] === "true";
  const isFloated = any(isFocused, hasValue, isExpanded);
  const isOutlined = variant === "outlined";

  const { labelRef, containerRef, clipPath } = useInputNotchedOutline({
    isFloating,
    isFloated,
    isOutlined,
    label,
    leading,
    size,
  });

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
    if (isFloating && !isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (isFloating) {
      setIsFocused(true);
    }
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (isFloating) {
      setIsFocused(false);
    }
    onBlur?.(e);
  };

  // Accessibility bindings
  const userDescribedBy = props["aria-describedby"];
  const describedByParts = [
    userDescribedBy,
    error ? errorId : undefined,
    description ? descriptionId : undefined,
  ].filter(Boolean);
  const finalDescribedBy = describedByParts.length > 0 ? describedByParts.join(" ") : undefined;

  const hasExternalLabel = all(!isFloating, Boolean(label));
  const hasFooter = any(Boolean(error), Boolean(description));
  const needsOuterWrapper = any(hasExternalLabel, hasFooter);

  const controlContainer = (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className={cn(
        "group",
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
      {/* Leading Slot */}
      {when(
        leading,
        <span
          data-slot="input-leading"
          className="inline-flex shrink-0 items-center justify-center pointer-events-none [&_button]:pointer-events-auto [&_a]:pointer-events-auto [&_input]:pointer-events-auto"
        >
          {leading}
        </span>
      )}

      {/* Native Input Element / Floating Slot */}
      <div className="relative flex-1 min-w-0 flex items-center h-full">
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
            "w-full h-full min-w-0 bg-transparent outline-none focus:outline-none focus:ring-0 disabled:cursor-not-allowed selection:bg-primary/30",
            "font-normal antialiased placeholder:antialiased leading-normal",
            cond(
              isInvalid,
              "text-destructive placeholder:text-destructive/60",
              "text-foreground placeholder:text-muted/60"
            )
          )}
          {...props}
        />
        <InputFloatingLabel
          id={labelId}
          htmlFor={inputId}
          label={label}
          required={props.required}
          isFloating={isFloating}
          isFloated={isFloated}
          isFocused={isFocused}
          isExpanded={isExpanded}
          isInvalid={isInvalid}
          disabled={disabled}
          size={size}
          labelRef={labelRef}
        />
      </div>

      {/* Trailing Slot */}
      {when(
        trailing,
        <span
          data-slot="input-trailing"
          className="inline-flex shrink-0 items-center justify-center pointer-events-none [&_button]:pointer-events-auto [&_a]:pointer-events-auto [&_input]:pointer-events-auto"
        >
          {trailing}
        </span>
      )}

      {/* Unified Notched Border Overlay */}
      <InputNotchedOutline
        isOutlined={isOutlined}
        isFloated={isFloated}
        isFocused={isFocused}
        isInvalid={isInvalid}
        disabled={disabled}
        clipPath={clipPath}
      />
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
            match(size, { sm: "text-xs", md: "text-sm", lg: "text-base" }, "text-sm"),
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

Input.displayName = "Input";
