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
  "w-full transform-gpu origin-center transition-[color,background-color,border-color,opacity] duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)] outline-none focus:outline-none focus:ring-0 leading-normal selection:bg-primary/30",
  {
    variants: {
      variant: {
        outlined:
          "border border-border bg-transparent hover:border-foreground/30 focus:border-primary focus:hover:border-primary",
        contained:
          "border border-transparent bg-surface hover:bg-surface-hover focus:border-primary",
        plain: "border border-transparent bg-transparent hover:bg-surface-hover",
      },
      size: {
        sm: "min-h-control-sm px-2.5 py-1.5 text-xs",
        md: "min-h-control-md px-3 py-2 text-sm",
        lg: "min-h-control-lg px-3.5 py-2.5 text-base",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-2xl",
      },
      invalid: {
        true: "border-destructive/30 hover:border-destructive focus:border-destructive text-destructive placeholder:text-destructive/60",
        false: "text-foreground placeholder:text-muted",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none bg-surface/50",
        false: "",
      },
    },
    compoundVariants: [
      {
        invalid: true,
        variant: "contained",
        className:
          "border-destructive focus:border-destructive bg-destructive/10 hover:bg-destructive/20",
      },
      {
        invalid: true,
        variant: "plain",
        className:
          "border-transparent hover:border-transparent hover:bg-destructive/20 focus:border-transparent",
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

    const floatingLabelLeft = match(
      size,
      {
        sm: "left-2.5",
        md: "left-3",
        lg: "left-3.5",
      },
      "left-3"
    );

    const restingLabelTop = match(
      size,
      {
        sm: "top-2",
        md: "top-2.5",
        lg: "top-3",
      },
      "top-2.5"
    );

    const floatingLabelElement = when(
      all(isFloating, Boolean(label)),
      <div
        className={cn(
          "pointer-events-none absolute select-none z-10 flex items-center",
          "transform-gpu transition-all duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)] motion-reduce:transition-none",
          floatingLabelLeft,
          cond(
            isFloated,
            "top-0 -translate-y-1/2",
            cn(restingLabelTop, "translate-y-0")
          )
        )}
      >
        <div className="relative inline-grid items-center -ml-1">
          <span
            aria-hidden="true"
            className={cn(
              "col-start-1 row-start-1 h-full w-full px-1.5 -my-1 rounded-xs",
              "transform-gpu origin-left scale-85",
              "transition duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)] motion-reduce:transition-none",
              floatingLabelBg,
              cond(isFloated, "opacity-100", "opacity-0")
            )}
          />

          <label
            id={labelId}
            htmlFor={inputId}
            data-slot="textarea-floating-label"
            data-floated={cond(isFloated, "true", "false")}
            className={cn(
              "col-start-1 row-start-1 inline-flex items-center px-1 rounded-xs truncate leading-normal origin-left",
              "transform-gpu subpixel-antialiased",
              "transition duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)] motion-reduce:transition-none",
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

    const hasExternalLabel = all(!isFloating, Boolean(label));
    const hasFooter = any(Boolean(error), Boolean(description));
    const needsOuterWrapper = any(hasExternalLabel, hasFooter);

    const activeResize = cond(autoResize, "none", resize);
    const resizeClass = match(activeResize, resizeClasses, "resize-y");

    const leadingPadding = when(
      Boolean(leading),
      match(size, { sm: "pl-8", md: "pl-9", lg: "pl-10" }, "pl-9")
    );

    const trailingPadding = when(
      Boolean(trailing),
      match(size, { sm: "pr-8", md: "pr-9", lg: "pr-10" }, "pr-9")
    );

    const iconTopClass = match(
      size,
      {
        sm: "top-1.5",
        md: "top-2",
        lg: "top-2.5",
      },
      "top-2"
    );

    const hasDecorations = any(Boolean(leading), Boolean(trailing), isFloating);

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
          variants({
            variant,
            size,
            radius,
            invalid: isInvalid,
            disabled,
          }),
          leadingPadding,
          trailingPadding,
          resizeClass,
          cond(!needsOuterWrapper && !hasDecorations, className, undefined)
        )}
        {...props}
      />
    );

    const controlWrapper = cond(
      hasDecorations,
      <div
        onClick={handleContainerClick}
        className={cn(
          "relative w-full",
          cond(!needsOuterWrapper, className, undefined)
        )}
      >
        {floatingLabelElement}

        {when(
          leading,
          <span
            data-slot="textarea-leading"
            className={cn(
              "absolute left-3 items-start pointer-events-none z-10 [&_button]:pointer-events-auto [&_a]:pointer-events-auto",
              iconTopClass
            )}
          >
            {leading}
          </span>
        )}

        {textareaElement}

        {when(
          trailing,
          <span
            data-slot="textarea-trailing"
            className={cn(
              "absolute right-3 items-start pointer-events-none z-10 [&_button]:pointer-events-auto [&_a]:pointer-events-auto",
              iconTopClass
            )}
          >
            {trailing}
          </span>
        )}
      </div>,
      textareaElement
    );

    if (!needsOuterWrapper) {
      return controlWrapper;
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
                { sm: "text-xs", md: "text-sm", lg: "text-base" },
                "text-sm"
              ),
              cond(disabled, "opacity-60 cursor-not-allowed", "cursor-pointer")
            )}
          >
            {label}
          </label>
        )}

        {controlWrapper}

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

