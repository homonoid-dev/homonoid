"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { SidebarContentProps } from "./types";

export const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  function SidebarContent({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sidebar-content"
        className={cn(
          "flex-1 flex flex-col gap-surface-gap p-surface-sm overflow-y-auto overflow-x-hidden",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarContent.displayName = "Sidebar.Content";

