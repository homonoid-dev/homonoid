"use client";

import { forwardRef, type MouseEvent } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond, when } from "../../utils/condition";
import { useAccordionContext } from "./AccordionContext";
import { useAccordionItemContext } from "./AccordionItemContext";
import type { AccordionTriggerProps } from "./types";

const triggerVariants = cva(
  "flex w-full select-none items-center justify-between text-left font-medium subpixel-antialiased transition duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)] active:scale-[var(--motion-press-scale)] focus-ring cursor-pointer disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 bg-transparent text-foreground hover:text-foreground",
  {
    variants: {
      size: {
        sm: "min-h-control-sm px-3 py-2 text-xs gap-2",
        md: "min-h-control-md px-4 py-3 text-sm gap-3",
        lg: "min-h-control-lg px-5 py-4 text-base gap-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger(
    {
      leading,
      description,
      trailing,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) {
    const { toggle, size } = useAccordionContext();
    const { value, disabled, open, triggerId, contentId } =
      useAccordionItemContext();

    const defaultChevron = (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn(
          "size-4 shrink-0 text-muted transition-transform duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] motion-reduce:transition-none",
          cond(open, "rotate-180", "rotate-0")
        )}
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    );

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      toggle(value);
      onClick?.(event);
    };

    const hasStructuredContent = Boolean(leading || description);

    return (
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
        className={cn(triggerVariants({ size }), className)}
        onClick={handleClick}
        {...props}
      >
        {cond(
          hasStructuredContent,
          <span className="flex min-w-0 flex-1 items-center gap-3 text-left">
            {when(leading, <span className="shrink-0">{leading}</span>)}
            <span className="flex min-w-0 flex-1 flex-col justify-center">
              <span className="truncate">{children}</span>
              {when(
                description,
                <span className="truncate text-xs font-normal text-muted">
                  {description}
                </span>
              )}
            </span>
          </span>,
          <span className="flex-1 min-w-0 text-left">{children}</span>
        )}

        {trailing !== undefined ? trailing : defaultChevron}
      </button>
    );
  }
);

AccordionTrigger.displayName = "Accordion.Trigger";
