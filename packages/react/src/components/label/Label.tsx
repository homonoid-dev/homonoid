import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { LabelProps } from "./types";

export const variants = cva("font-bold tracking-tight text-foreground", {
  variants: {
    size: {
      "2xs": "text-xs font-medium tracking-normal",
      xs: "text-sm font-medium tracking-normal",
      sm: "text-base font-semibold",
      md: "text-lg",
      lg: "text-2xl",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export const Label = forwardRef<HTMLElement, LabelProps>(function Label(
  { as: Component = "h1", size, className, children, ...props },
  ref
) {
  return (
    <Component
      ref={ref}
      data-slot="label"
      className={cn(variants({ size }), className)}
      {...props}
    >
      {children}
    </Component>
  );
});

Label.displayName = "Label";
