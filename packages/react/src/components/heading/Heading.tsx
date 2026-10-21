import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { HeadingProps } from "./types";

export const variants = cva("font-bold tracking-tight text-foreground", {
  variants: {
    size: {
      sm: "text-base font-semibold",
      md: "text-lg font-bold tracking-tight",
      lg: "text-2xl font-bold tracking-tight",
      xl: "text-3xl font-bold tracking-tight",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { as: Component = "h1", size, className, children, ...props },
  ref
) {
  return (
    <Component
      ref={ref}
      className={cn(variants({ size }), className)}
      {...props}
    >
      {children}
    </Component>
  );
});

Heading.displayName = "Heading";
