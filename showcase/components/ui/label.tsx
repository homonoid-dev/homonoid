import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@harmonia/web/cn";

export const variants = cva("font-bold tracking-tight text-foreground", {
  variants: {
    size: {
      sm: "text-base font-semibold",
      md: "text-lg",
      lg: "text-2xl",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export interface LabelProps
  extends HTMLAttributes<HTMLElement>,
  VariantProps<typeof variants> {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "label";
}

export function Label({
  as: Component = "h1",
  size,
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <Component className={cn(variants({ size }), className)} {...props}>
      {children}
    </Component>
  );
}

export { Label as Title };
