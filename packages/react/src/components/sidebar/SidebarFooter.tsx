"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { SidebarFooterProps } from "./types";

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  function SidebarFooter({ sticky = false, children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sidebar-footer"
        data-sticky={cond(sticky, "true", undefined)}
        className={cn(
          "flex flex-col gap-2 p-3 shrink-0 mt-auto",
          cond(sticky, "sticky bottom-0 z-10 bg-background/95 backdrop-blur-xs", undefined),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarFooter.displayName = "Sidebar.Footer";

