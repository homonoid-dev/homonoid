import { cn } from "@homonoid/react/cn";
import type { DockProps } from "./types";

export function Dock({ className, children }: DockProps = {}) {
  return (
    <div
      data-slot="toc-dock"
      className={cn(
        "fixed bottom-layout inset-x-layout mx-auto h-10 rounded-full bg-surface/50 backdrop-blur-md border border-border/60 md:hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
