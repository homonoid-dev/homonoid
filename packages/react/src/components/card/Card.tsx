import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { CardProps } from "./types";

export const variants = cva(
  "rounded-3xl overflow-hidden transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)]",
  {
    variants: {
      variant: {
        outlined: "bg-transparent",
        filled: "",
      },
      color: {
        primary: "text-primary-foreground",
        subtle: "text-subtle-foreground",
        surface: "text-foreground",
        destructive: "text-destructive-foreground",
      },
      border: {
        true: "border-[0.5px]",
        false: "border-0",
      },
      padding: {
        none: "p-0",
        sm: "p-surface-sm",
        md: "p-surface-md",
        lg: "p-surface-lg",
        surface: "p-surface",
      },
    },
    compoundVariants: [
      // Border colors when border is true
      { border: true, color: "primary", className: "border-primary-border" },
      { border: true, color: "subtle", className: "border-subtle-border" },
      { border: true, color: "surface", className: "border-border" },
      { border: true, color: "destructive", className: "border-destructive-border" },

      // Fills when variant is filled
      { variant: "filled", color: "primary", className: "bg-primary" },
      { variant: "filled", color: "subtle", className: "bg-subtle" },
      { variant: "filled", color: "surface", className: "bg-surface" },
      { variant: "filled", color: "destructive", className: "bg-destructive" },
    ],
    defaultVariants: {
      variant: "outlined",
      color: "surface",
      border: true,
      padding: "surface",
    },
  }
);

export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  {
    as: Component = "div",
    variant,
    color,
    border,
    padding,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <Component
      ref={ref}
      className={cn(variants({ variant, color, border, padding }), className)}
      {...props}
    >
      {children}
    </Component>
  );
});

Card.displayName = "Card";
