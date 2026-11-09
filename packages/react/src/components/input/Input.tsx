"use client";

import {
  forwardRef,
  useId,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
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

const DATE_INPUT_TYPES = new Set([
  "date",
  "time",
  "datetime-local",
  "month",
  "week"
]);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
  const labelRef = useRef<HTMLLabelElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [notchGeometry, setNotchGeometry] = useState<{ left: number; width: number } | null>(null);
  const isInvalid = any(invalid, Boolean(error));

  useIsomorphicLayoutEffect(() => {
    if (!isFloating || variant !== "outlined") return;
    const labelEl = labelRef.current;
    const containerEl = containerRef.current;
    if (!labelEl || !containerEl) return;

    const labelRect = labelEl.getBoundingClientRect();
    const containerRect = containerEl.getBoundingClientRect();

    const left = Math.round(labelRect.left - containerRect.left);
    const width = Math.round(labelRect.width * 0.85);

    if (width > 0) {
      setNotchGeometry({ left, width });
    }
  }, [isFloating, variant, label, leading, size]);

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

  const currentValue = cond(isControlled, value, internalValue);
  const isDateType = Boolean(props.type && DATE_INPUT_TYPES.has(props.type));
  const hasValue = any(
    currentValue !== undefined && currentValue !== null && currentValue !== "",
    Boolean(innerRef.current?.value),
    isDateType
  );
  const isExpanded = props["aria-expanded"] === true || props["aria-expanded"] === "true";
  const isFloated = any(isFocused, hasValue, isExpanded);

  // Accessibility bindings
  const userDescribedBy = props["aria-describedby"];
  const describedByParts = [
    userDescribedBy,
    error ? errorId : undefined,
    description ? descriptionId : undefined
  ].filter(Boolean);
  const finalDescribedBy = describedByParts.length > 0 ? describedByParts.join(" ") : undefined;

  const floatingLabelColor = cond(
    isInvalid,
    "text-destructive",
    cond(any(isFocused, isExpanded), "text-primary", "text-muted")
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

  const isNotchedOutline = all(isFloating, variant === "outlined");

  const defaultNotchLeft = cond(
    Boolean(leading),
    match(size, { sm: 34, md: 38, lg: 44 }, 38),
    match(size, { sm: 10, md: 12, lg: 16 }, 12)
  );

  const notchX1 = cond(
    notchGeometry !== null,
    Math.max(0, (notchGeometry?.left ?? defaultNotchLeft) - 4),
    defaultNotchLeft
  );
  const notchX2 = cond(
    notchGeometry !== null,
    notchX1 + (notchGeometry?.width ?? 64) + 8,
    notchX1 + 72
  );

  // Directional GPU sweep:
  // Closed: collapsed at notchX2 (far right side of the notch)
  // Open: sweeps leftward to notchX1 (opening from far right to left)
  // Closing: sweeps rightward from notchX1 to notchX2 (closing from left to right)
  const currentClipPath = cond(
    isNotchedOutline,
    cond(
      isFloated,
      `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, ${notchX2}px 0%, ${notchX2}px 10px, ${notchX1}px 10px, ${notchX1}px 0%)`,
      `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, ${notchX2}px 0%, ${notchX2}px 0%, ${notchX2}px 0%, ${notchX2}px 0%)`
    ),
    undefined
  );

  const outlineBorderColor = cond(
    isInvalid,
    "border-destructive",
    cond(
      disabled,
      "border-border opacity-50",
      cond(
        isFocused,
        "border-primary",
        "border-border group-hover:border-foreground/30 group-focus-within:border-primary"
      )
    )
  );

  const outlineMotionDuration = cond(
    isFloated,
    "duration-[var(--motion-duration-fast)]",
    "duration-1000"
  );

  const notchedOutlineElement = when(
    isNotchedOutline,
    <div
      aria-hidden="true"
      style={{ clipPath: currentClipPath }}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] border z-10",
        "transition-[clip-path,border-color] ease-[var(--motion-easing)] motion-reduce:transition-none",
        outlineMotionDuration,
        outlineBorderColor
      )}
    />
  );

  const floatingLabelElement = when(
    all(isFloating, Boolean(label)),
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none z-10 flex items-center",
        "transform-gpu transition ease-[var(--motion-easing)] motion-reduce:transition-none",
        outlineMotionDuration,
        cond(isFloated, "-translate-y-1/2", "translate-y-0")
      )}
    >
      <div className="relative inline-grid items-center -ml-1">
        {/* Text Label Scaling Layer */}
        <label
          ref={labelRef}
          id={labelId}
          htmlFor={inputId}
          data-slot="input-floating-label"
          data-floated={cond(isFloated, "true", "false")}
          className={cn(
            "col-start-1 row-start-1 inline-flex items-center px-1 rounded-xs truncate leading-normal origin-left",
            "transform-gpu antialiased font-normal",
            "transition ease-[var(--motion-easing)] motion-reduce:transition-none",
            outlineMotionDuration,
            restingLabelSize,
            floatingLabelColor,
            cond(isFloated, "scale-85 -translate-y-0.5", "scale-100 translate-y-0"),
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
        "min-w-0 bg-transparent outline-none focus:outline-none focus:ring-0 disabled:cursor-not-allowed selection:bg-primary/30",
        "font-normal placeholder:opacity-100",
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
        cond(
          isNotchedOutline,
          "border-0 border-transparent hover:border-transparent focus-within:border-transparent focus-within:hover:border-transparent",
          undefined
        ),
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

      {/* Unified Notched Border Overlay */}
      {notchedOutlineElement}
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
