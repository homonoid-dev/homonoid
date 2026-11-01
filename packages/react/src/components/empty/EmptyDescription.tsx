"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { useEmptyContext } from "./EmptyContext";
import type { EmptyDescriptionProps } from "./types";

const descriptionVariants = cva(
  "text-muted leading-relaxed subpixel-antialiased",
  {
    variants: {
      size: {
        sm: "text-xs max-w-xs",
        md: "text-sm max-w-sm",
        lg: "text-base max-w-md",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const EmptyDescription = forwardRef<
  HTMLParagraphElement,
  EmptyDescriptionProps
>(function EmptyDescription(
  { as: Component = "p", className, children, ...props },
  ref
) {
  const { size } = useEmptyContext();

  return (
    <Component
      ref={ref}
      data-slot="empty-description"
      className={cn(descriptionVariants({ size }), className)}
      {...props}
    >
      {children}
    </Component>
  );
});

EmptyDescription.displayName = "Empty.Description";
