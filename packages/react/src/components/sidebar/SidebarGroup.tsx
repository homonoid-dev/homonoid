"use client";

import { forwardRef, useId } from "react";
import { cn } from "../../utils/cn";
import { all, cond, when } from "../../utils/condition";
import { Label } from "../label/Label";
import { useSidebarContext } from "./SidebarContext";
import type { SidebarGroupProps } from "./types";

export const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  function SidebarGroup({ label, children, className, ...props }, ref) {
    const { collapsed } = useSidebarContext();
    const generatedId = useId();
    const headingId = `sidebar-group-${generatedId}`;

    return (
      <div
        ref={ref}
        role="group"
        aria-labelledby={cond(Boolean(label), headingId, undefined)}
        data-slot="sidebar-group"
        className={cn("flex flex-col gap-1 w-full", className)}
        {...props}
      >
        {when(
          all(Boolean(label), !collapsed),
          <Label
            id={headingId}
            as="div"
            className="px-2.5 py-1 text-xs text-muted font-medium select-none truncate"
          >
            {label}
          </Label>
        )}
        {children}
      </div>
    );
  }
);

SidebarGroup.displayName = "Sidebar.Group";

