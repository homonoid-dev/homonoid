"use client";

import {
  forwardRef,
  isValidElement,
  type MouseEvent,
  type KeyboardEvent,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond, when } from "../../utils/condition";
import { Label } from "../label/Label";
import { Description } from "../description/Description";
import { useAccordionContext } from "./AccordionContext";
import { useAccordionItemContext } from "./AccordionItemContext";
import type { AccordionTriggerProps } from "./types";

const triggerVariants = cva(
  "flex w-full select-none items-center justify-between text-left font-medium subpixel-antialiased transition duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)] active:scale-[var(--motion-press-scale)] focus-ring cursor-pointer disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40 bg-transparent text-foreground hover:text-foreground",
  {
    variants: {
      size: {
        sm: "min-h-control-sm py-2 text-xs gap-2",
        md: "min-h-control-md py-3 text-sm gap-3",
        lg: "min-h-control-lg py-4 text-base gap-4",
      },
      variant: {
        flush: "px-0",
        bordered: "",
        separated: "",
      },
    },
    compoundVariants: [
      { variant: ["bordered", "separated"], size: "sm", className: "px-3" },
      { variant: ["bordered", "separated"], size: "md", className: "px-4" },
      { variant: ["bordered", "separated"], size: "lg", className: "px-5" },
    ],
    defaultVariants: {
      size: "md",
      variant: "flush",
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
      onKeyDown,
      ...props
    },
    ref
  ) {
    const { toggle, size, variant, handleKeyDown } = useAccordionContext();
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

    const handleKey = (event: KeyboardEvent<HTMLButtonElement>) => {
      handleKeyDown(event);
      onKeyDown?.(event);
    };

    const hasStructuredContent = Boolean(leading || description);

    const labelNode = cond(
      isValidElement(children),
      children,
      <Label as="span" size={size} disabled={disabled} className="truncate">
        {children}
      </Label>
    );

    const descriptionNode = when(
      Boolean(description),
      cond(
        isValidElement(description),
        description,
        <Description
          as="span"
          size={cond(size === "lg", "md", "sm")}
          disabled={disabled}
          className="truncate"
        >
          {description}
        </Description>
      )
    );

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
        className={cn(triggerVariants({ size, variant }), className)}
        onClick={handleClick}
        onKeyDown={handleKey}
        {...props}
      >
        {cond(
          hasStructuredContent,
          <span className="flex min-w-0 flex-1 items-center gap-3 text-left">
            {when(leading, <span className="shrink-0">{leading}</span>)}
            <span className="flex min-w-0 flex-1 flex-col justify-center">
              {labelNode}
              {descriptionNode}
            </span>
          </span>,
          <span className="flex-1 min-w-0 text-left">{labelNode}</span>
        )}

        {trailing !== undefined ? trailing : defaultChevron}
      </button>
    );
  }
);

AccordionTrigger.displayName = "Accordion.Trigger";
