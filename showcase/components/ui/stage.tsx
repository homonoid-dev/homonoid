import type { ReactNode } from "react";
import { cn } from "@homonoid/react/cn";

export interface StageProps {
  children?: ReactNode;
  className?: string;
}

export function Stage({ children, className }: StageProps) {
  return (
    <div
      data-slot="studio-stage"
      className={cn(
        "relative w-full min-h-[400px] md:min-h-[420px] lg:min-h-[520px] rounded-2xl border border-border flex items-center justify-center p-surface overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}

