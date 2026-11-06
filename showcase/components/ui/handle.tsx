import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@homonoid/react/cn";

export interface HandleProps extends ComponentPropsWithoutRef<"div"> {
  side: "left" | "right";
}

export function Handle({ side, className, style, ...props }: HandleProps) {
  const isLeft = side === "left";
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      data-slot="stage-handle"
      data-side={side}
      style={{
        top: "50%",
        left: isLeft ? "0%" : "100%",
        transform: "translate(-50%, -50%)",
        ...style,
      }}
      className={cn(
        "absolute z-10 w-2 h-11 rounded-full bg-surface-elevated border border-border cursor-col-resize transition-colors select-none hover:bg-muted",
        className
      )}
      {...props}
    />
  );
}

