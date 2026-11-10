"use client";

import {
  forwardRef,
  useCallback,
  type MouseEvent,
  type KeyboardEvent,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond, when } from "../../utils/condition";
import { useTabsContext } from "./TabsContext";
import type { TabsTabProps } from "./types";

export const tabVariants = cva(
  "group/tab relative select-none font-medium flex items-center justify-center isolate outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-40 transition-[background-color,border-color,color,fill,stroke,opacity,box-shadow,transform] duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus focus-visible:z-10",
  {
    variants: {
      size: {
        sm: "h-control-sm px-control-sm-x gap-control-gap text-xs active:scale-[var(--motion-press-scale-sm)]",
        md: "h-control-md px-control-md-x gap-control-gap text-sm active:scale-[var(--motion-press-scale-md)]",
        lg: "h-control-lg px-control-lg-x gap-control-gap text-base active:scale-[var(--motion-press-scale-lg)]",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      layout: {
        inline: "",
        full: "w-full",
        icon: "p-0 shrink-0",
      },
    },
    compoundVariants: [
      { layout: "icon", size: "sm", className: "w-control-sm" },
      { layout: "icon", size: "md", className: "w-control-md" },
      { layout: "icon", size: "lg", className: "w-control-lg" },
    ],
    defaultVariants: {
      size: "md",
      radius: "full",
      layout: "inline",
    },
  }
);

export const TabsTab = forwardRef<HTMLButtonElement, TabsTabProps>(
  function TabsTab(
    {
      value,
      disabled = false,
      variant: explicitVariant,
      color: explicitColor,
      size: explicitSize,
      radius: explicitRadius,
      layout = "inline",
      leading,
      trailing,
      onClick,
      onKeyDown,
      className,
      children,
      ...props
    },
    ref
  ) {
    const context = useTabsContext();

    const effectiveVariant = explicitVariant ?? context.variant;
    const effectiveColor = explicitColor ?? context.color;
    const effectiveSize = explicitSize ?? context.size;
    const effectiveRadius = explicitRadius ?? context.radius;
    const effectiveDisabled = context.disabled || disabled;

    const isSelected = context.value === value;
    const isContainedOrOutlined = effectiveVariant === "contained" || effectiveVariant === "outlined";

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        if (effectiveDisabled) return;
        context.onValueChange(value);
        onClick?.(event);
      },
      [effectiveDisabled, context, value, onClick]
    );

    const handleKey = useCallback(
      (event: KeyboardEvent<HTMLButtonElement>) => {
        if (context.handleKeyDown) {
          context.handleKeyDown(event);
        }
        onKeyDown?.(event);
      },
      [context, onKeyDown]
    );

    // Style resolution based on variant, color, and selected state
    const stateStyles = cond(
      isContainedOrOutlined,
      cond(
        isSelected,
        cond(
          effectiveColor === "primary",
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover",
          cond(
            effectiveColor === "subtle",
            "bg-subtle text-subtle-foreground shadow-xs hover:bg-subtle-hover",
            cond(
              effectiveColor === "destructive",
              "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive-hover",
              "bg-surface-active text-foreground shadow-xs"
            )
          )
        ),
        cond(
          effectiveColor === "primary",
          "text-primary/70 hover:text-primary hover:bg-primary/10",
          cond(
            effectiveColor === "destructive",
            "text-destructive/70 hover:text-destructive hover:bg-destructive/10",
            "text-muted hover:text-foreground hover:bg-surface-hover/60"
          )
        )
      ),
      // plain variant
      cond(
        isSelected,
        cond(
          effectiveColor === "primary",
          "text-primary bg-primary/10",
          cond(
            effectiveColor === "destructive",
            "text-destructive bg-destructive/10",
            cond(
              effectiveColor === "subtle",
              "text-subtle-foreground bg-subtle",
              "text-foreground bg-surface-active"
            )
          )
        ),
        "text-muted hover:text-foreground hover:bg-surface-hover/40"
      )
    );

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={`${context.baseId}-tab-${value}`}
        aria-controls={`${context.baseId}-panel-${value}`}
        aria-selected={isSelected}
        tabIndex={cond(isSelected, 0, -1)}
        disabled={effectiveDisabled}
        data-slot="tabs-tab"
        data-state={cond(isSelected, "active", "inactive")}
        data-variant={effectiveVariant}
        data-color={effectiveColor}
        data-size={effectiveSize}
        className={cn(
          tabVariants({
            size: effectiveSize,
            radius: effectiveRadius,
            layout,
          }),
          stateStyles,
          className
        )}
        onClick={handleClick}
        onKeyDown={handleKey}
        {...props}
      >
        {when(Boolean(leading), <span className="shrink-0">{leading}</span>)}
        {children}
        {when(Boolean(trailing), <span className="shrink-0">{trailing}</span>)}
      </button>
    );
  }
);

TabsTab.displayName = "Tabs.Tab";
