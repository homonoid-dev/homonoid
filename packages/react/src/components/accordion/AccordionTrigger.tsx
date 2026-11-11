"use client";

import {
  forwardRef,
  isValidElement,
  useMemo,
  type MouseEvent,
  type KeyboardEvent,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond, when } from "../../utils/condition";
import { Label } from "../label/Label";
import { Description } from "../description/Description";
import { useAccordionContext, resolveIndicator } from "./AccordionContext";
import { useAccordionItemContext } from "./AccordionItemContext";
import { AccordionIndicator } from "./AccordionIndicator";
import type { AccordionTriggerProps } from "./types";

export const accordionTriggerVariants = cva(
  "group flex w-full select-none items-center justify-between text-left font-medium subpixel-antialiased transition duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)] active:scale-[var(--motion-press-scale-expanded)] focus-ring cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed bg-transparent text-foreground hover:text-foreground",
  {
    variants: {
      size: {
        sm: "min-h-control-sm py-control-sm-y text-xs gap-control-gap",
        md: "min-h-control-md py-control-md-y text-sm gap-control-gap",
        lg: "min-h-control-lg py-control-lg-y text-base gap-control-gap",
      },
      variant: {
        plain: "px-0",
        outlined: "",
        contained: "",
      },
    },
    compoundVariants: [
      { variant: ["outlined", "contained"], size: "sm", className: "px-control-sm-x" },
      { variant: ["outlined", "contained"], size: "md", className: "px-control-md-x" },
      { variant: ["outlined", "contained"], size: "lg", className: "px-control-lg-x" },
    ],
    defaultVariants: {
      size: "md",
      variant: "plain",
    },
  }
);

export const triggerVariants = accordionTriggerVariants;

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger(
    {
      leading,
      description,
      trailing,
      indicator: localIndicator,
      className,
      children,
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) {
    const { toggle, size, variant, handleKeyDown, indicator: rootIndicator } =
      useAccordionContext();
    const { value, disabled, open, triggerId, contentId } =
      useAccordionItemContext();

    const effectiveIndicator = useMemo(
      () => resolveIndicator(localIndicator) ?? rootIndicator,
      [localIndicator, rootIndicator]
    );

    const renderedIndicator = when(
      Boolean(effectiveIndicator),
      <AccordionIndicator rotate={effectiveIndicator?.rotate}>
        {effectiveIndicator?.icon}
      </AccordionIndicator>
    );

    const resolvedLeading = cond(
      leading !== undefined,
      leading,
      cond(effectiveIndicator?.placement === "leading", renderedIndicator, undefined)
    );

    const resolvedTrailing = cond(
      trailing !== undefined,
      trailing,
      cond(effectiveIndicator?.placement === "trailing", renderedIndicator, undefined)
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

    const hasStructuredContent = Boolean(resolvedLeading || description);

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
        className={cn(accordionTriggerVariants({ size, variant }), className)}
        onClick={handleClick}
        onKeyDown={handleKey}
        {...props}
      >
        {cond(
          hasStructuredContent,
          <span className="flex min-w-0 flex-1 items-center gap-3 text-left">
            {when(Boolean(resolvedLeading), <span className="shrink-0">{resolvedLeading}</span>)}
            <span className="flex min-w-0 flex-1 flex-col justify-center">
              {labelNode}
              {descriptionNode}
            </span>
          </span>,
          <span className="flex-1 min-w-0 text-left">{labelNode}</span>
        )}

        {resolvedTrailing}
      </button>
    );
  }
);

AccordionTrigger.displayName = "Accordion.Trigger";
