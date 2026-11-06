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
        "relative w-full h-[clamp(340px,45vw,540px)] rounded-2xl border border-border flex items-center justify-center p-surface",
        className
      )}
    >
      {children}
    </div>
  );
}

