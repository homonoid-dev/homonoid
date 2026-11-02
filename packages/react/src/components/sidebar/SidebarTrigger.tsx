"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { Button } from "../button/Button";
import { useSidebarContext } from "./SidebarContext";
import type { SidebarTriggerProps } from "./types";

export const SidebarTrigger = forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  function SidebarTrigger({ className, onClick, icon, children, ...props }, ref) {
    const { collapsed, toggleCollapsed, sidebarId } = useSidebarContext();

    return (
      <Button
        ref={ref}
        type="button"
        variant="plain"
        size="sm"
        aria-controls={sidebarId}
        aria-expanded={!collapsed}
        aria-label={cond(collapsed, "Expand sidebar", "Collapse sidebar")}
        onClick={(e) => {
          toggleCollapsed();
          onClick?.(e);
        }}
        className={cn("size-control-sm p-0 shrink-0", className)}
        {...props}
      >
        {children || icon || (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
            aria-hidden="true"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 3v18" />
            <path d="m14 9-3 3 3 3" />
          </svg>
        )}
      </Button>
    );
  }
);

SidebarTrigger.displayName = "Sidebar.Trigger";

