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
        primary: "text-foreground",
        subtle: "text-subtle-foreground",
        surface: "text-foreground",
        destructive: "text-foreground",
      },
      border: {
        true: "border",
        false: "border border-transparent",
      },
      padding: {
        none: "p-0",
        sm: "p-surface-sm",
        md: "p-surface-md",
        lg: "p-surface-lg",
      },
    },
    compoundVariants: [
      // Border colors when border is true
      { border: true, color: "primary", className: "border-primary-border" },
      { border: true, color: "subtle", className: "border-subtle-border" },
      { border: true, color: "surface", className: "border-border" },
      { border: true, color: "destructive", className: "border-destructive-border" },

      // Fills when variant is filled
      { variant: "filled", color: "primary", className: "bg-primary-background" },
      { variant: "filled", color: "subtle", className: "bg-subtle-background" },
      { variant: "filled", color: "surface", className: "bg-surface" },
      { variant: "filled", color: "destructive", className: "bg-destructive-background" },
    ],
    defaultVariants: {
      variant: "outlined",
      color: "surface",
      border: true,
      padding: "md",
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
