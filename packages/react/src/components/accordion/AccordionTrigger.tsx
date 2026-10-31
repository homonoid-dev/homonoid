"use client";

import { forwardRef, type MouseEvent } from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { Tile } from "../tile/Tile";
import { useAccordionContext } from "./AccordionContext";
import { useAccordionItemContext } from "./AccordionItemContext";
import type { AccordionTriggerProps } from "./types";

export const AccordionTrigger = forwardRef<HTMLElement, AccordionTriggerProps>(
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
    const { toggle, size, color } = useAccordionContext();
    const { value, disabled, open, triggerId, contentId } =
      useAccordionItemContext();

    const chevron = (
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

    const handleClick = (event: MouseEvent<HTMLElement>) => {
      if (disabled) return;
      toggle(value);
      onClick?.(event);
    };

    return (
      <Tile
        ref={ref}
        as="button"
        id={triggerId}
        variant="plain"
        color={color as any}
        size={size}
        radius="none"
        interactive
        disabled={disabled}
        aria-expanded={open}
        aria-controls={contentId}
        data-accordion-trigger=""
        data-state={cond(open, "open", "closed")}
        leading={leading}
        description={description}
        label={children}
        trailing={trailing !== undefined ? trailing : chevron}
        className={cn("w-full cursor-pointer focus-ring", className)}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

AccordionTrigger.displayName = "Accordion.Trigger";
