"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { SidebarHeaderProps } from "./types";

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  function SidebarHeader({ sticky = false, children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sidebar-header"
        data-sticky={cond(sticky, "true", undefined)}
        className={cn(
          "flex flex-col gap-surface-gap px-surface-sm pt-surface-sm shrink-0",
          cond(sticky, "sticky top-0 z-10", undefined),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarHeader.displayName = "Sidebar.Header";

