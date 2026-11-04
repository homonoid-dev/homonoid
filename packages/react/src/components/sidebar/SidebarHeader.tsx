"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { cond, when } from "../../utils/condition";
import type { SidebarHeaderProps } from "./types";

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  function SidebarHeader({ sticky = false, children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sidebar-header"
        data-sticky={cond(sticky, "true", undefined)}
        className={cn(
          "relative flex flex-col p-surface-sm shrink-0",
          cond(sticky, "sticky top-0 z-10", undefined),
          className
        )}
        {...props}
      >
        {when(
          sticky,
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-background backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black_0%,black_35%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_35%,transparent_100%)]"
          />
        )}
        <div className="relative z-10 flex flex-col gap-control-gap w-full">
          {children}
        </div>
      </div>
    );
  }
);

SidebarHeader.displayName = "Sidebar.Header";

