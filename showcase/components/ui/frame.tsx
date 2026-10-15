import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@harmonia/react/cn";

export interface FrameProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export function Frame({
  as: Component = "div",
  children,
  className,
  ...props
}: FrameProps) {
  return (
    <Component
      className={cn(
        "size-control-md rounded-full border border-border flex items-center justify-center shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
