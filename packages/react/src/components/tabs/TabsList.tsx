"use client";

import { forwardRef, useRef } from "react";
import { cva } from "class-variance-authority";
import { useMergeRefs } from "@floating-ui/react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useTabsContext } from "./TabsContext";
import type { TabsListProps } from "./types";

export const listVariants = cva(
  "inline-flex items-center isolate select-none",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      variant: {
        pill: "p-1 bg-surface border border-border gap-1",
        outlined: "p-1 border border-border gap-1",
        plain: "gap-1",
        underlined: "border-b border-border gap-2 w-full",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      variant: "pill",
      radius: "full",
    },
  }
);

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  function TabsList(
    {
      variant: explicitVariant,
      color: _explicitColor,
      size: _explicitSize,
      radius: explicitRadius,
      orientation: explicitOrientation,
      className,
      children,
      ...props
    },
    ref
  ) {
    const context = useTabsContext();

    const effectiveVariant = explicitVariant ?? context.variant;
    const effectiveRadius = explicitRadius ?? context.radius;
    const effectiveOrientation = explicitOrientation ?? context.orientation;

    const internalRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = useMergeRefs([internalRef, ref]);

    return (
      <div
        ref={mergedRef}
        role="tablist"
        aria-orientation={effectiveOrientation}
        data-slot="tabs-list"
        data-variant={effectiveVariant}
        data-orientation={effectiveOrientation}
        className={cn(
          listVariants({
            variant: effectiveVariant,
            radius: cond(effectiveVariant === "underlined", "none", effectiveRadius),
            orientation: effectiveOrientation,
          }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsList.displayName = "Tabs.List";

