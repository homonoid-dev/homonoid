"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { FloatingPortal, useTransitionStyles, useMergeRefs } from "@floating-ui/react";
import { useTooltipContext } from "./TooltipContext";
import { cn } from "../../utils/cn";
import { all, iff } from "../../utils/condition";
import type { TooltipContentProps } from "./types";

export const variants = cva(
  "select-none whitespace-nowrap font-medium transform-gpu origin-center inline-flex items-center has-[[data-slot=shortcut]]:pr-1.5",
  {
    variants: {
      variant: {
        inverted: "bg-foreground text-background border border-foreground/10",
        surface: "bg-surface text-foreground border border-border",
        primary: "bg-primary text-primary-foreground border border-primary-border",
      },
      size: {
        sm: "px-2.5 py-1 text-xs rounded-full",
        md: "px-3.5 py-1.5 text-sm rounded-lg",
      },
    },
    defaultVariants: {
      variant: "inverted",
      size: "sm",
    },
  }
);

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent(
    { children, variant, size, className, ...props },
    ref
  ) {
    const {
      context,
      setFloating,
      floatingStyles,
      getFloatingProps,
      disabled,
      variant: contextVariant,
      size: contextSize,
    } = useTooltipContext();

    const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
      duration: {
        open: 140,
        close: 80,
      },
      common: {
        transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
      },
      initial: {
        opacity: 0,
        transform: "scale(0.96)",
      },
      open: {
        opacity: 1,
        transform: "scale(1)",
      },
      close: {
        opacity: 0,
        transform: "scale(0.96)",
      },
    });

    const mergedRef = useMergeRefs([setFloating, ref]);

    if (!all(isMounted, !disabled)) {
      return null;
    }

    const activeVariant = iff(Boolean(variant), variant, contextVariant);
    const activeSize = iff(Boolean(size), size, contextSize);

    return (
      <FloatingPortal>
        <div
          ref={mergedRef}
          style={floatingStyles}
          {...getFloatingProps(props as Record<string, unknown>)}
          className="z-50 pointer-events-none"
        >
          <div
            style={transitionStyles}
            className={cn(
              variants({
                variant: activeVariant,
                size: activeSize,
              }),
              "pointer-events-none",
              className
            )}
          >
            {children}
          </div>
        </div>
      </FloatingPortal>
    );
  }
);

TooltipContent.displayName = "Tooltip.Content";
