"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { useSwitchContext } from "./SwitchContext";
import type { SwitchThumbProps } from "./types";

export const thumbVariants = cva(
  "pointer-events-none inline-flex items-center justify-center rounded-[inherit] bg-primary-foreground text-foreground shadow-xs transition-transform duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] transform-gpu select-none",
  {
    variants: {
      size: {
        sm: "w-3 h-3",
        md: "w-5 h-5",
        lg: "w-6 h-6",
      },
      checked: {
        true: "",
        false: "translate-x-0",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        checked: true,
        className: "translate-x-3",
      },
      {
        size: "md",
        checked: true,
        className: "translate-x-5",
      },
      {
        size: "lg",
        checked: true,
        className: "translate-x-6",
      },
    ],
    defaultVariants: {
      size: "md",
      checked: false,
    },
  }
);

export const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>(
  function SwitchThumb({ className, children, ...props }, ref) {
    const { isChecked, size } = useSwitchContext();

    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn(
          thumbVariants({ size, checked: isChecked }),
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

SwitchThumb.displayName = "Switch.Thumb";
