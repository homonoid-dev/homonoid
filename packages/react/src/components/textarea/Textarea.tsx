"use client";

import {
  forwardRef,
  useId,
  useRef,
  useState,
  useCallback,
  useEffect,
  type ChangeEvent,
  type FocusEvent,
  type MouseEvent,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { all, any, cond, match, when } from "../../utils/condition";
import type { TextareaProps, TextareaResize } from "./types";

export const variants = cva(
  "relative w-full inline-flex items-start transform-gpu origin-center transition-[color,background-color,border-color,opacity] duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)]",
  {
    variants: {
      variant: {
        outlined:
          "border border-border bg-transparent hover:border-foreground/30 focus-within:border-primary focus-within:hover:border-primary",
        contained:
          "border border-transparent bg-surface hover:bg-surface-hover focus-within:border-primary",
        plain: "border border-transparent bg-transparent hover:bg-surface-hover",
      },
      size: {
        sm: "px-2.5 py-2 gap-2 text-xs",
        md: "px-3 py-2.5 gap-2.5 text-sm",
        lg: "px-3.5 py-3 gap-3 text-base",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-2xl",
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
        className:
          "border-destructive focus-within:border-destructive bg-destructive/10 hover:bg-destructive/20",
      },
      {
        invalid: true,
        variant: "plain",
        className:
          "border-transparent hover:border-transparent hover:bg-destructive/20 focus-within:border-transparent focus-within:hover:border-transparent focus-within:ring-transparent",
      },
    ],
    defaultVariants: {
      variant: "outlined",
      size: "md",
      radius: "md",
      invalid: false,
      disabled: false,
    },
  }
);

const resizeClasses: Record<TextareaResize, string> = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
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
      disabled = false,
      autoResize = false,
      minRows = 3,
      maxRows = 10,
      resize = "vertical",
      rows,
      leading,
      trailing,
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

    const innerRef = useRef<HTMLTextAreaElement | null>(null);
    const isInvalid = any(invalid, Boolean(error));

    const setRefs = (element: HTMLTextAreaElement | null) => {
      innerRef.current = element;
      if (!ref) return;
      if (typeof ref === "function") {
        ref(element);
      } else {
        (ref as React.RefObject<HTMLTextAreaElement | null>).current = element;
      }
    };

    const adjustHeight = useCallback(() => {
      const element = innerRef.current;
      if (!element || !autoResize) return;

      element.style.height = "auto";
      const computed = window.getComputedStyle(element);
      const lineHeight =
        parseFloat(computed.lineHeight) ||
        match(size, { sm: 16, md: 20, lg: 24 }, 20);

      const minHeight = minRows ? minRows * lineHeight : 0;
      const maxHeight = maxRows ? maxRows * lineHeight : Infinity;

      const targetHeight = Math.min(
        Math.max(element.scrollHeight, minHeight),
        maxHeight
      );

      element.style.height = `${targetHeight}px`;
      element.style.overflowY =
        element.scrollHeight > maxHeight ? "auto" : "hidden";
    }, [autoResize, minRows, maxRows, size]);

    useEffect(() => {
      adjustHeight();
    }, [adjustHeight, value, internalValue]);

    const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
      if (
        e.target !== innerRef.current &&
        !(e.target as HTMLElement).closest("button, a, input, textarea")
      ) {
        innerRef.current?.focus();
      }
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      adjustHeight();
      onChange?.(e);
    };

    const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
      if (isFloating) {
        setIsFocused(true);
      }
      onFocus?.(e);
    };

    const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
      if (isFloating) {
        setIsFocused(false);
      }
      onBlur?.(e);
    };

    const currentValue = cond(isControlled, value, internalValue);
    const hasValue = any(
      currentValue !== undefined && currentValue !== null && currentValue !== "",
      Boolean(innerRef.current?.value)
    );
    const isFloated = any(isFocused, hasValue);

    const userDescribedBy = props["aria-describedby"];
    const describedByParts = [
      userDescribedBy,
      error ? errorId : undefined,
      description ? descriptionId : undefined,
    ].filter(Boolean);
    const finalDescribedBy =
      describedByParts.length > 0 ? describedByParts.join(" ") : undefined;

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

    const restingLabelOffset = match(
      size,
      {
        sm: "translate-y-2",
        md: "translate-y-2.5",
        lg: "translate-y-3",
      },
      "translate-y-2.5"
    );

    const floatingLabelElement = when(
      all(isFloating, Boolean(label)),
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 select-none z-10 flex items-start",
          "transform-gpu transition duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)] motion-reduce:transition-none",
          cond(isFloated, "-translate-y-1/2", restingLabelOffset)
        )}
      >
        <div className="relative inline-grid items-center -ml-1">
          <span
            aria-hidden="true"
            className={cn(
              "col-start-1 row-start-1 h-full w-full px-1 rounded-xs",
              "transform-gpu origin-left scale-85",
              "transition duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)] motion-reduce:transition-none",
              floatingLabelBg,
              cond(
                isFloated,
                "-translate-y-0.5 opacity-100",
                "translate-y-0 opacity-0"
              )
            )}
          />

          <label
            id={labelId}
            htmlFor={inputId}
            data-slot="textarea-floating-label"
            data-floated={cond(isFloated, "true", "false")}
            className={cn(
              "col-start-1 row-start-1 inline-flex items-center px-1 rounded-xs truncate font-medium leading-normal origin-left",
              "transform-gpu subpixel-antialiased",
              "transition duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)] motion-reduce:transition-none",
              restingLabelSize,
              floatingLabelColor,
              cond(
                isFloated,
                "scale-85 -translate-y-0.5",
                "scale-100 translate-y-0"
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
      </div>
    );

    const activeResize = cond(autoResize, "none", resize);
    const resizeClass = match(activeResize, resizeClasses, "resize-y");

    const textareaElement = (
      <textarea
        ref={setRefs}
        id={inputId}
        rows={rows ?? (autoResize ? minRows : 3)}
        disabled={disabled}
        aria-invalid={cond(isInvalid, true, undefined)}
        aria-describedby={finalDescribedBy}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={cond(
          isFloating,
          cond(isFloated, placeholder, undefined),
          placeholder
        )}
        className={cn(
          "w-full bg-transparent outline-none focus:outline-none focus:ring-0 disabled:cursor-not-allowed selection:bg-primary/30 leading-normal",
          cond(
            isInvalid,
            "text-destructive placeholder:text-destructive/60",
            "text-foreground placeholder:text-muted"
          ),
          resizeClass
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
        {when(
          leading,
          <span
            data-slot="textarea-leading"
            className="inline-flex shrink-0 items-start pt-0.5 pointer-events-none [&_button]:pointer-events-auto [&_a]:pointer-events-auto"
          >
            {leading}
          </span>
        )}

        {cond(
          isFloating,
          <div className="relative w-full flex-1 min-w-0">
            {textareaElement}
            {floatingLabelElement}
          </div>,
          textareaElement
        )}

        {when(
          trailing,
          <span
            data-slot="textarea-trailing"
            className="inline-flex shrink-0 items-start pt-0.5 pointer-events-none [&_button]:pointer-events-auto [&_a]:pointer-events-auto"
          >
            {trailing}
          </span>
        )}
      </div>
    );

    if (!needsOuterWrapper) {
      return controlContainer;
    }

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
              match(
                size,
                { sm: "text-[11px]", md: "text-xs", lg: "text-sm" },
                "text-xs"
              ),
              cond(disabled, "opacity-60 cursor-not-allowed", "cursor-pointer")
            )}
          >
            {label}
          </label>
        )}

        {controlContainer}

        {when(
          error,
          <span
            id={errorId}
            className="text-xs text-destructive font-medium leading-normal"
          >
            {error}
          </span>
        )}

        {when(
          !error && description,
          <span
            id={descriptionId}
            className="text-xs text-muted leading-normal"
          >
            {description}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

