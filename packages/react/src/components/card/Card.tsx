import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { CardProps } from "./types";

export const variants = cva(
  "rounded-3xl border border-border overflow-hidden transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-easing-standard)]",
  {
    variants: {
      variant: {
        outlined: "bg-transparent",
        filled: "bg-surface text-surface-foreground",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        surface: "p-surface",
      },
    },
    defaultVariants: {
      variant: "outlined",
      padding: "surface",
    },
  }
);

export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { as: Component = "div", variant, padding, className, children, ...props },
  ref
) {
  return (
    <Component
      ref={ref}
      className={cn(variants({ variant, padding }), className)}
      {...props}
    >
      {children}
    </Component>
  );
});

Card.displayName = "Card";
