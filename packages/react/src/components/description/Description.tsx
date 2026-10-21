import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { DescriptionProps } from "./types";

export const variants = cva("leading-relaxed select-none", {
  variants: {
    variant: {
      muted: "text-muted",
      surface: "text-foreground",
    },
    size: {
      sm: "text-xs leading-normal",
      md: "text-sm leading-normal",
      lg: "text-base leading-relaxed",
    },
    disabled: {
      true: "text-muted",
      false: "",
    },
  },
  defaultVariants: {
    variant: "muted",
    size: "sm",
    disabled: false,
  },
});

export const Description = forwardRef<HTMLElement, DescriptionProps>(
  function Description(
    { as: Component = "p", variant, size, disabled = false, className, children, ...props },
    ref
  ) {
    return (
      <Component
        ref={ref}
        data-slot="description"
        aria-disabled={disabled || undefined}
        className={cn(variants({ variant, size, disabled }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Description.displayName = "Description";
