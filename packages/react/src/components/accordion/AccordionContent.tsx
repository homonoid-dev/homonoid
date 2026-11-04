"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useAccordionContext } from "./AccordionContext";
import { useAccordionItemContext } from "./AccordionItemContext";
import type { AccordionContentProps } from "./types";

export const accordionRegionVariants = cva(
  "grid transition-[grid-template-rows] duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] motion-reduce:transition-none",
  {
    variants: {
      open: {
        true: "grid-rows-[1fr]",
        false: "grid-rows-[0fr]",
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);

export const accordionContentVariants = cva(
  "text-muted leading-relaxed transform-gpu origin-top transition motion-reduce:transition-none",
  {
    variants: {
      open: {
        true: "opacity-100 scale-100 duration-[var(--motion-duration-slow)] ease-out",
        false: "opacity-0 scale-[var(--motion-press-scale-expanded)] pointer-events-none duration-[var(--motion-duration-fast)] ease-in",
      },
      size: {
        sm: "pb-control-md-y pt-control-sm-y text-xs",
        md: "pb-control-md-y pt-control-sm-y text-sm",
        lg: "pb-control-lg-y pt-control-sm-y text-base",
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
      open: false,
      size: "md",
      variant: "plain",
    },
  }
);

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent({ className, children, ...props }, ref) {
    const { size, variant } = useAccordionContext();
    const { open, triggerId, contentId } = useAccordionItemContext();

    return (
      <div
        ref={ref}
        role="region"
        id={contentId}
        aria-labelledby={triggerId}
        data-state={cond(open, "open", "closed")}
        className={cn(accordionRegionVariants({ open }), className)}
        {...props}
      >
        <div className="min-h-0 overflow-hidden">
          <div className={accordionContentVariants({ open, size, variant })}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);

AccordionContent.displayName = "Accordion.Content";
