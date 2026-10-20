"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useControlContext } from "../../utils/control-context";
import type { DescriptionProps, DescriptionSize } from "./types";

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
    { as, variant, size, className, children, ...props },
    ref
  ) {
    const control = useControlContext();

    const Component = as ?? cond(Boolean(control), "span", "p");

    const fallbackSize: DescriptionSize = cond(
      Boolean(control),
      cond(control?.size === "lg", "sm", "xs"),
      "sm"
    );

    const effectiveSize = size ?? fallbackSize;

    return (
      <Component
        ref={ref}
        data-slot="description"
        className={cn(
          variants({ variant, size: effectiveSize }),
          cond(Boolean(control), "mt-0.5 leading-tight", undefined),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Description.displayName = "Description";
