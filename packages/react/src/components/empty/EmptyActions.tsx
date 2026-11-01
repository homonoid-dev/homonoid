"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { useEmptyContext } from "./EmptyContext";
import type { EmptyActionsProps } from "./types";

const actionsVariants = cva(
  "inline-flex flex-wrap items-center justify-center",
  {
    variants: {
      size: {
        sm: "mt-1.5 gap-2",
        md: "mt-2.5 gap-2.5",
        lg: "mt-3.5 gap-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const EmptyActions = forwardRef<HTMLDivElement, EmptyActionsProps>(
  function EmptyActions({ className, children, ...props }, ref) {
    const { size } = useEmptyContext();

    return (
      <div
        ref={ref}
        data-slot="empty-actions"
        className={cn(actionsVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

EmptyActions.displayName = "Empty.Actions";

