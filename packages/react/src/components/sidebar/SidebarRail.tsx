"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { useSidebarContext } from "./SidebarContext";
import type { SidebarRailProps } from "./types";

export const SidebarRail = forwardRef<HTMLButtonElement, SidebarRailProps>(
  function SidebarRail({ className, ...props }, ref) {
    const { toggleCollapsed, collapsed, sidebarId } = useSidebarContext();

    return (
      <button
        ref={ref}
        type="button"
        data-slot="sidebar-rail"
        aria-controls={sidebarId}
        aria-expanded={!collapsed}
        aria-label="Toggle sidebar rail"
        onClick={toggleCollapsed}
        className={cn(
          "absolute inset-y-0 -right-2 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-hover:block",
          "hover:after:bg-primary/20 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] after:-translate-x-1/2",
          className
        )}
        {...props}
      />
    );
  }
);

SidebarRail.displayName = "Sidebar.Rail";

