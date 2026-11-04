"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { cond, when } from "../../utils/condition";
import type { SidebarFooterProps } from "./types";

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  function SidebarFooter({ sticky = false, children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="sidebar-footer"
        data-sticky={cond(sticky, "true", undefined)}
        className={cn(
          "relative flex flex-col p-surface-sm shrink-0 mt-auto",
          cond(sticky, "sticky bottom-0 z-10", undefined),
          className
        )}
        {...props}
      >
        {when(
          sticky,
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-background backdrop-blur-xl [mask-image:linear-gradient(to_top,black_0%,black_50%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,black_50%,transparent_100%)]"
          />
        )}
        <div className="relative z-10 flex flex-col gap-surface-gap w-full">
          {children}
        </div>
      </div>
    );
  }
);

SidebarFooter.displayName = "Sidebar.Footer";

