import { cn } from "@homonoid/react/cn";
import type { SidebarHeaderProps } from "./types";

export function SidebarHeader({
  sticky,
  children,
  className,
  ...props
}: SidebarHeaderProps) {
  return (
    <header
      className={cn(
        "h-15 top-15 shrink-0 flex items-center text-lg font-bold px-layout-x",
        sticky && "sticky top-0 z-10",
        className
      )}
      {...props}
    >
      {children}
    </header>
  );
}
