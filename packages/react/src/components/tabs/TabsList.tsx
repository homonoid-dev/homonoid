"use client";

import { forwardRef, useRef } from "react";
import { cva } from "class-variance-authority";
import { useMergeRefs } from "@floating-ui/react";
import { cn } from "../../utils/cn";
import { useTabsContext } from "./TabsContext";
import type { TabsListProps } from "./types";

export const variatns = cva(
  "inline-flex items-center isolate select-none",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      variant: {
        contained: "p-1 gap-1",
        outlined: "p-1 bg-transparent border gap-1",
        plain: "bg-transparent gap-1",
      },
      color: {
        surface: "",
        subtle: "",
        primary: "",
        destructive: "",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
      },
    },
    compoundVariants: [
      {
        variant: "contained",
        color: "surface",
        className: "bg-surface",
      },
      {
        variant: "contained",
        color: "subtle",
        className: "bg-subtle",
      },
      {
        variant: "contained",
        color: "primary",
        className: "bg-primary/10",
      },
      {
        variant: "contained",
        color: "destructive",
        className: "bg-destructive/10",
      },
      {
        variant: "outlined",
        color: "surface",
        className: "border-border",
      },
      {
        variant: "outlined",
        color: "subtle",
        className: "border-subtle-border",
      },
      {
        variant: "outlined",
        color: "primary",
        className: "border-primary-border",
      },
      {
        variant: "outlined",
        color: "destructive",
        className: "border-destructive-border",
      },
    ],
    defaultVariants: {
      orientation: "horizontal",
      variant: "contained",
      color: "surface",
      radius: "full",
    },
  }
);

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  function TabsList(
    {
      variant: explicitVariant,
      color: explicitColor,
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
    const effectiveColor = explicitColor ?? context.color;
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
        data-color={effectiveColor}
        data-orientation={effectiveOrientation}
        className={cn(
          variatns({
            variant: effectiveVariant,
            color: effectiveColor,
            radius: effectiveRadius,
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
