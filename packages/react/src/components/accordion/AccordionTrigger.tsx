"use client";

import { forwardRef, type MouseEvent, type KeyboardEvent } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useAccordionContext } from "./AccordionContext";
import { useAccordionItemContext } from "./AccordionItemContext";
import type { AccordionTriggerProps } from "./types";

const triggerVariants = cva(
  "relative flex w-full select-none items-center justify-between text-left font-medium subpixel-antialiased transition duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)] active:scale-[var(--motion-press-scale)] focus-ring cursor-pointer disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
  {
    variants: {
      variant: {
        flush: "text-foreground hover:bg-surface-hover/60 rounded-lg",
        bordered: "text-foreground hover:bg-surface-hover",
        separated: "text-foreground hover:bg-surface-hover",
      },
      size: {
        sm: "min-h-control-sm px-3 py-2 text-xs gap-2",
        md: "min-h-control-md px-4 py-3 text-sm gap-3",
        lg: "min-h-control-lg px-5 py-4 text-base gap-4",
      },
    },
    defaultVariants: {
      variant: "flush",
      size: "md",
    },
  }
);

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger(
    {
      asHeading,
      hideChevron = false,
      chevronIcon,
      className,
      children,
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) {
    const {
      toggle,
      size,
      variant,
      headingLevel,
      disabled: rootDisabled,
      handleKeyDown,
    } = useAccordionContext();
    const {
      value,
      disabled: itemDisabled,
      open,
      triggerId,
      contentId,
    } = useAccordionItemContext();

    const disabled = rootDisabled || itemDisabled;
    const HeadingElement = asHeading ?? headingLevel ?? "h3";

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      toggle(value);
      onClick?.(event);
    };

    const handleKey = (event: KeyboardEvent<HTMLButtonElement>) => {
      handleKeyDown(event);
      onKeyDown?.(event);
    };

    return (
      <HeadingElement className="flex m-0 p-0 text-inherit font-inherit">
        <button
          ref={ref}
          type="button"
          id={triggerId}
          disabled={disabled}
          aria-disabled={cond(disabled, true, undefined)}
          aria-expanded={open}
          aria-controls={contentId}
          data-accordion-trigger=""
          data-state={cond(open, "open", "closed")}
          data-disabled={cond(disabled, "", undefined)}
          className={cn(triggerVariants({ variant, size }), className)}
          onClick={handleClick}
          onKeyDown={handleKey}
          {...props}
        >
          <span className="flex-1 text-left">{children}</span>
          {cond(
            !hideChevron,
            chevronIcon ?? (
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className={cn(
                  "shrink-0 text-muted transition-transform duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] motion-reduce:transition-none",
                  cond(size === "sm", "size-3.5", cond(size === "lg", "size-5", "size-4")),
                  cond(open, "rotate-180", "rotate-0")
                )}
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            null
          )}
        </button>
      </HeadingElement>
    );
  }
);

AccordionTrigger.displayName = "Accordion.Trigger";
