"use client";

import { cn } from "@harmonia/web";
import { cva } from "class-variance-authority";
import type { SidebarProps } from "./types";

export const variants = cva(
  "h-full w-52 bg-background px-layout-x overflow-y-auto transition-all",
  {
    variants: {
      side: {
        left: "border-r-[0.5px] border-border/50",
        right: "border-l-[0.5px] border-border/50",
      },
    },
    defaultVariants: {
      side: "left",
    },
  }
);

export function Sidebar({ side, className, children, ...props }: SidebarProps) {
  return (
    <aside className={cn(variants({ side }), className)} {...props}>
      {children}
    </aside>
  );
}