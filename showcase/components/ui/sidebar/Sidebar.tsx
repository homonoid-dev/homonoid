import { Children, isValidElement } from "react";
import { cn } from "@homonoid/react/cn";
import { cond } from "@homonoid/react";
import { cva } from "class-variance-authority";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarItem } from "./SidebarItem";
import type { SidebarProps } from "./types";

export const variants = cva(
  "relative h-full shrink-0 bg-background border-r-[0.5px] border-border/50 w-58 select-none flex flex-col"
);

export function Sidebar({
  className,
  contentClassName,
  children,
  ...props
}: SidebarProps) {
  const items = Children.toArray(children);
  const header = items.find(
    (child) =>
      isValidElement(child) &&
      (child.type === SidebarHeader ||
        (child.type as { displayName?: string })?.displayName === "SidebarHeader")
  );
  const body = header ? items.filter((child) => child !== header) : items;

  return (
    <aside className={cn(variants(), className)} {...props}>
      {header}
      <div
        className={cn(
          "flex-1 flex flex-col gap-control-gap overflow-y-auto overflow-x-hidden",
          cond(Boolean(header), "px-surface-sm pb-surface-sm", "p-surface-sm"),
          contentClassName
        )}
      >
        {body}
      </div>
    </aside>
  );
}

Sidebar.Header = SidebarHeader;
Sidebar.Item = SidebarItem;
