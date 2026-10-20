"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useControlContext } from "../../utils/control-context";
import type { LabelProps, LabelSize } from "./types";

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
  { as, size, className, children, ...props },
  ref
) {
  const control = useControlContext();

  const Component = as ?? cond(Boolean(control), "span", "h1");

  const controlLineHeight = cond(
    Boolean(control),
    cond(
      control?.control === "switch",
      cond(
        control?.size === "sm",
        "leading-4",
        cond(control?.size === "lg", "leading-8", "leading-6")
      ),
      cond(
        control?.size === "sm",
        "leading-4",
        cond(control?.size === "lg", "leading-6", "leading-5")
      )
    ),
    undefined
  );

  const fallbackSize: LabelSize = cond(
    Boolean(control),
    cond(
      control?.size === "sm",
      "2xs",
      cond(control?.size === "lg", "sm", "xs")
    ),
    "lg"
  );

  const effectiveSize = size ?? fallbackSize;

  return (
    <Component
      ref={ref}
      data-slot="label"
      className={cn(variants({ size: effectiveSize }), controlLineHeight, className)}
      {...props}
    >
      {children}
    </Component>
  );
});

Label.displayName = "Label";
