import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { LabelProps } from "./types";

export const variants = cva("font-medium text-foreground select-none", {
  variants: {
    size: {
      sm: "text-xs leading-4",
      md: "text-sm leading-5",
      lg: "text-base leading-6 font-semibold",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const Label = forwardRef<HTMLElement, LabelProps>(function Label(
  { as, size, className, children, ...props },
  ref
) {
  const Component = as || (props.htmlFor ? "label" : "span");
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
