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
  },
  defaultVariants: {
    variant: "muted",
  },
});

export const Description = forwardRef<HTMLElement, DescriptionProps>(
  function Description(
    { as: Component = "p", variant, className, children, ...props },
    ref
  ) {
    return (
      <Component
        ref={ref}
        className={cn(variants({ variant }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Description.displayName = "Description";
