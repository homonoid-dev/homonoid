import type { ComponentType, ElementType, HTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@homonoid/react/cn";
import { Heading, cond, when } from "@homonoid/react";

export interface FrameProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  text?: string;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
  children?: ReactNode;
  className?: string;
}

export function Frame({
  as: Component = "div",
  text,
  icon: Icon,
  children,
  className,
  ...props
}: FrameProps) {
  return (
    <Component
      className={cn(
        "w-fit flex items-center justify-center border border-border rounded-full shrink-0",
        cond(Boolean(text), "h-control-md pl-4 pr-6 gap-4", "size-control-md"),
        className
      )}
      {...props}
    >
      {when(Boolean(Icon), () => {
        const IconComponent = Icon!;
        return <IconComponent className="size-4 shrink-0" />;
      })}
      {when(Boolean(text), <Heading size="md" as="h2">{text}</Heading>)}

      {children}
    </Component>
  );
}
