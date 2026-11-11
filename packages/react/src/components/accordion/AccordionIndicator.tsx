"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useAccordionItemContext } from "./AccordionItemContext";
import type { AccordionIndicatorProps } from "./types";

export const accordionIndicatorVariants = cva(
  "inline-flex shrink-0 items-center justify-center transition-transform duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] motion-reduce:transition-none",
  {
    variants: {
      rotate: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      rotate: true,
    },
  }
);

export const AccordionIndicator = forwardRef<HTMLSpanElement, AccordionIndicatorProps>(
  function AccordionIndicator(
    { rotate = true, className, children, ...props },
    ref
  ) {
    const { open } = useAccordionItemContext();

    return (
      <span
        ref={ref}
        aria-hidden="true"
        data-state={cond(open, "open", "closed")}
        className={cn(
          accordionIndicatorVariants({ rotate }),
          cond(rotate && open, "rotate-180", "rotate-0"),
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

AccordionIndicator.displayName = "Accordion.Indicator";

