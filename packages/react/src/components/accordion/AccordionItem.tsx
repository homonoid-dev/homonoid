"use client";

import { forwardRef, useId } from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useAccordionContext } from "./AccordionContext";
import {
  AccordionItemContext,
  type AccordionItemContextValue,
} from "./AccordionItemContext";
import type { AccordionItemProps } from "./types";

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem({ value, disabled = false, className, children, ...props }, ref) {
    const { isExpanded, variant } = useAccordionContext();
    const open = isExpanded(value);

    const generatedId = useId();
    const triggerId = `accordion-trigger-${generatedId}`;
    const contentId = `accordion-content-${generatedId}`;

    const contextValue: AccordionItemContextValue = {
      value,
      disabled,
      open,
      triggerId,
      contentId,
    };

    const variantStyles = cond(
      variant === "separated",
      "border border-border rounded-2xl overflow-hidden bg-surface transition-colors duration-[var(--motion-duration-fast)]",
      "border-b border-border last:border-b-0"
    );

    return (
      <AccordionItemContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-state={cond(open, "open", "closed")}
          data-disabled={cond(disabled, "", undefined)}
          className={cn(variantStyles, className)}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = "Accordion.Item";

