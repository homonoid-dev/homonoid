"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { Separator } from "../separator/Separator";
import type { SidebarSeparatorProps } from "./types";

export const SidebarSeparator = forwardRef<HTMLDivElement, SidebarSeparatorProps>(
  function SidebarSeparator({ className, ...props }, ref) {
    return (
      <Separator
        ref={ref}
        data-slot="sidebar-separator"
        className={cn("my-1 mx-2 w-auto", className)}
        {...props}
      />
    );
  }
);

SidebarSeparator.displayName = "Sidebar.Separator";

