import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { DescriptionProps } from "./types";

export const variants = cva("leading-relaxed", {
  variants: {
    variant: {
      muted: "text-muted",
      surface: "text-foreground",
    },
    size: {
      xs: "text-xs leading-normal",
      sm: "text-sm leading-normal",
      md: "text-base leading-relaxed",
      lg: "text-lg leading-relaxed",
    },
  },
  defaultVariants: {
    variant: "muted",
    size: "sm",
  },
});

export const Description = forwardRef<HTMLElement, DescriptionProps>(
  function Description(
    { as: Component = "p", variant, size, className, children, ...props },
    ref
  ) {
    return (
      <Component
        ref={ref}
        data-slot="description"
        className={cn(variants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Description.displayName = "Description";
