"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useAccordionContext } from "./AccordionContext";
import { useAccordionItemContext } from "./AccordionItemContext";
import type { AccordionContentProps } from "./types";

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent({ className, children, ...props }, ref) {
    const { size } = useAccordionContext();
    const { open, triggerId, contentId } = useAccordionItemContext();

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
              cond(
                size === "sm",
                "px-3 pb-3 pt-1.5 text-xs",
                cond(
                  size === "lg",
                  "px-5 pb-5 pt-2 text-base",
                  "px-4 pb-4 pt-1.5 text-sm"
                )
              )
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
