import { cn } from "@homonoid/react/cn";
import { cva } from "class-variance-authority";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarItem } from "./SidebarItem";
import type { SidebarProps } from "./types";

export const variants = cva(
  "relative h-full shrink-0 bg-background border-r-[0.5px] border-border/50 w-58 select-none"
);

export function Sidebar({
  className,
  contentClassName,
  children,
  ...props
}: SidebarProps) {
  return (
    <aside className={cn(variants(), className)} {...props}>
      <div
        className={cn(
          "flex flex-col gap-control-gap p-surface-sm h-full overflow-y-auto overflow-x-hidden",
          contentClassName
        )}
      >
        {children}
      </div>
    </aside>
  );
}

Sidebar.Header = SidebarHeader;
Sidebar.Item = SidebarItem;
