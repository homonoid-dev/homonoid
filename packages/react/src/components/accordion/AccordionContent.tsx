"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useAccordionContext } from "./AccordionContext";
import { useAccordionItemContext } from "./AccordionItemContext";
import type { AccordionContentProps } from "./types";

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent({ className, children, ...props }, ref) {
    const { size, variant } = useAccordionContext();
    const { open, triggerId, contentId } = useAccordionItemContext();

    const paddingX = cond(
      variant === "flush",
      "px-0",
      cond(size === "sm", "px-3", cond(size === "lg", "px-5", "px-4"))
    );

    const paddingY = cond(
      size === "sm",
      "pb-3 pt-1.5 text-xs",
      cond(size === "lg", "pb-5 pt-2 text-base", "pb-4 pt-1.5 text-sm")
    );

    return (
      <div
        ref={ref}
        role="region"
        id={contentId}
        aria-labelledby={triggerId}
        data-state={cond(open, "open", "closed")}
        className={cn(
          "grid transition-[grid-template-rows] duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] motion-reduce:transition-none",
          cond(open, "grid-rows-[1fr]", "grid-rows-[0fr]"),
          className
        )}
        {...props}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              "text-muted leading-relaxed",
              paddingX,
              paddingY
            )}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);

AccordionContent.displayName = "Accordion.Content";
