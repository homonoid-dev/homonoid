import type { ComponentType, ElementType, HTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@homonoid/react/cn";

export interface FrameProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
  children?: ReactNode;
  className?: string;
}

export function Frame({
  as: Component = "div",
  icon: Icon,
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
      {Icon ? <Icon className="size-4" /> : children}
    </Component>
  );
}
