"use client";

import { forwardRef, type MouseEvent, type KeyboardEvent } from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { Tile } from "../tile/Tile";
import { useAccordionContext } from "./AccordionContext";
import { useAccordionItemContext } from "./AccordionItemContext";
import type { AccordionTriggerProps } from "./types";

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger(
    {
      asHeading,
      hideChevron = false,
      chevronIcon,
      leading,
      description,
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

    const handleClick = (event: MouseEvent<HTMLElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      toggle(value);
      onClick?.(event as unknown as MouseEvent<HTMLButtonElement>);
    };

    const handleKey = (event: KeyboardEvent<HTMLElement>) => {
      handleKeyDown(event as unknown as KeyboardEvent<HTMLButtonElement>);
      onKeyDown?.(event as unknown as KeyboardEvent<HTMLButtonElement>);
    };

    const chevron = cond(
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
    );

    return (
      <HeadingElement className="flex m-0 p-0 text-inherit font-inherit">
        <Tile
          ref={ref as unknown as React.Ref<HTMLElement>}
          as="button"
          type="button"
          id={triggerId}
          variant="plain"
          color="surface"
          size={size}
          radius="none"
          interactive={false}
          disabled={disabled}
          leading={leading}
          description={description}
          trailing={chevron}
          aria-expanded={open}
          aria-controls={contentId}
          data-accordion-trigger=""
          data-state={cond(open, "open", "closed")}
          data-disabled={cond(disabled, "", undefined)}
          className={cn(
            "w-full cursor-pointer focus-ring",
            cond(
              variant === "flush",
              "hover:bg-surface-hover/60 rounded-lg",
              "hover:bg-surface-hover active:bg-surface-active"
            ),
            className
          )}
          onClick={handleClick}
          onKeyDown={handleKey}
          {...(props as any)}
        >
          {children}
        </Tile>
      </HeadingElement>
    );
  }
);

AccordionTrigger.displayName = "Accordion.Trigger";
