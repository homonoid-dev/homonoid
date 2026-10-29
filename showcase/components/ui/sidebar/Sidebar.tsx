"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@homonoid/react/cn";
import { cond } from "@homonoid/react";
import { cva } from "class-variance-authority";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarItem, SidebarDestination } from "./SidebarItem";
import { SidebarContext, type SidebarContextValue } from "./context";
import type { SidebarProps } from "./types";

export const variants = cva(
  "relative h-full shrink-0 bg-background transition-[width] duration-300 ease-in-out select-none",
  {
    variants: {
      side: {
        left: "border-r-[0.5px] border-border/50",
        right: "border-l-[0.5px] border-border/50",
      },
      collapsed: {
        true: "w-[calc(var(--p-layout-x)*2+1rem)]",
        false: "w-58",
      },
    },
    defaultVariants: {
      side: "left",
      collapsed: false,
    },
  }
);

export function Sidebar({
  side = "left",
  collapsible = false,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  className,
  contentClassName,
  children,
  ...props
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);

  const isCollapsed =
    collapsible &&
    cond(
      controlledCollapsed !== undefined,
      Boolean(controlledCollapsed),
      internalCollapsed
    );

  const handleSetCollapsed = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const next = cond(
        typeof value === "function",
        (value as (prev: boolean) => boolean)(isCollapsed),
        Boolean(value)
      );
      if (controlledCollapsed === undefined) {
        setInternalCollapsed(next);
      }
      onCollapsedChange?.(next);
    },
    [controlledCollapsed, isCollapsed, onCollapsedChange]
  );

  const toggleCollapse = useCallback(() => {
    handleSetCollapsed((prev) => !prev);
  }, [handleSetCollapsed]);

  const contextValue = useMemo<SidebarContextValue>(
    () => ({
      collapsible,
      collapsed: isCollapsed,
      setCollapsed: handleSetCollapsed,
      toggleCollapse,
      side,
    }),
    [collapsible, isCollapsed, handleSetCollapsed, toggleCollapse, side]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <aside
        data-side={side}
        data-collapsible={collapsible}
        data-collapsed={isCollapsed}
        className={cn(variants({ side, collapsed: isCollapsed }), className)}
        {...props}
      >
        <div
          className={cn(
            "flex flex-col gap-control-gap p-surface-sm h-full overflow-y-auto overflow-x-hidden",
            contentClassName
          )}
        >
          {children}
        </div>

        {collapsible && (
          <div
            role="button"
            tabIndex={0}
            aria-label={cond(isCollapsed, "Expand sidebar", "Collapse sidebar")}
            title={cond(isCollapsed, "Expand sidebar", "Collapse sidebar")}
            onClick={toggleCollapse}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleCollapse();
              }
            }}
            className={cn(
              "absolute inset-y-0 z-30 w-3 -translate-x-1/2 flex items-center justify-center transition-colors group/border outline-hidden select-none",
              cond(side === "right", "left-0", "left-full"),
              cond(
                side === "right",
                cond(isCollapsed, "cursor-w-resize", "cursor-e-resize"),
                cond(isCollapsed, "cursor-e-resize", "cursor-w-resize")
              )
            )}
          >
            <div className="w-[2px] h-full transition-colors duration-200 bg-transparent group-hover/border:bg-primary/80" />
          </div>
        )}
      </aside>
    </SidebarContext.Provider>
  );
}

Sidebar.Header = SidebarHeader;
Sidebar.Item = SidebarItem;
Sidebar.Destination = SidebarDestination;

