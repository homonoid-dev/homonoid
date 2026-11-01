"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { useEmptyContext } from "./EmptyContext";
import type { EmptyTitleProps } from "./types";

const titleVariants = cva(
  "font-semibold tracking-tight text-foreground subpixel-antialiased",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const EmptyTitle = forwardRef<HTMLHeadingElement, EmptyTitleProps>(
  function EmptyTitle(
    { as: Component = "h3", className, children, ...props },
    ref
  ) {
    const { size } = useEmptyContext();

    return (
      <Component
        ref={ref}
        data-slot="empty-title"
        className={cn(titleVariants({ size }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

EmptyTitle.displayName = "Empty.Title";

