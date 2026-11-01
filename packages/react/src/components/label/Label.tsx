import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { LabelProps } from "./types";

export const variants = cva("font-medium", {
  variants: {
    size: {
      sm: "text-xs leading-4",
      md: "text-sm leading-5",
      lg: "text-base leading-6 font-semibold",
    },
    disabled: {
      true: "text-muted cursor-not-allowed",
      false: "text-foreground",
    },
  },
  defaultVariants: {
    size: "md",
    disabled: false,
  },
});

export const Label = forwardRef<HTMLElement, LabelProps>(function Label(
  { as, size, disabled = false, className, children, ...props },
  ref
) {
  const Component = as || (props.htmlFor ? "label" : "span");
  return (
    <Component
      ref={ref}
      data-slot="label"
      aria-disabled={disabled || undefined}
      className={cn(variants({ size, disabled }), className)}
      {...props}
    >
      {children}
    </Component>
  );
});

Label.displayName = "Label";
