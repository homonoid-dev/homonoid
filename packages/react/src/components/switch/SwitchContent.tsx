"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { useSwitchContext } from "./SwitchContext";
import type { SwitchContentProps } from "./types";

export const switchContentVariants = cva("flex flex-col gap-0.5 select-none", {
  variants: {
    size: {
      sm: "[&>[data-slot=label],&>label]:leading-4",
      md: "[&>[data-slot=label],&>label]:leading-6",
      lg: "[&>[data-slot=label],&>label]:leading-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const SwitchContent = forwardRef<HTMLSpanElement, SwitchContentProps>(
  function SwitchContent({ className, children, ...props }, ref) {
    const { size } = useSwitchContext();

    return (
      <span
        ref={ref}
        className={cn(switchContentVariants({ size }), className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

SwitchContent.displayName = "Switch.Content";
