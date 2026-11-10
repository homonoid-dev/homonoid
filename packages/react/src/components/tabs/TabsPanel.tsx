"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useTabsContext } from "./TabsContext";
import type { TabsPanelProps } from "./types";

export const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(
  function TabsPanel({ value, children, className, ...props }, ref) {
    const { value: activeValue, baseId } = useTabsContext();
    const isSelected = activeValue === value;

    if (!isSelected) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`${baseId}-panel-${value}`}
        aria-labelledby={`${baseId}-tab-${value}`}
        tabIndex={0}
        data-slot="tabs-panel"
        data-state={cond(isSelected, "active", "inactive")}
        className={cn(
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus rounded-xl w-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsPanel.displayName = "Tabs.Panel";

