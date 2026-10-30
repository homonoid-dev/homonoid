import { cn } from "@homonoid/react/cn";
import { cond } from "@homonoid/react";
import type { SidebarHeaderProps } from "./types";

export function SidebarHeader({
  sticky = false,
  children,
  className,
  ...props
}: SidebarHeaderProps) {
  return (
    <header
      className={cn(
        "shrink-0 flex items-center w-full px-surface-sm pt-surface-sm pb-control-gap bg-background",
        cond(sticky, "sticky top-0 z-10", ""),
        className
      )}
      {...props}
    >
      {children}
    </header>
  );
}

SidebarHeader.displayName = "SidebarHeader";
