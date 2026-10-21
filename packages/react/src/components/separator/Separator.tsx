"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { SeparatorProps } from "./types";

export const variants = cva(
  "shrink-0 bg-border transition-colors duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)]",
  {
    variants: {
      orientation: {
        horizontal: "h-[0.5px] w-full",
        vertical: "w-[0.5px] h-full",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  function Separator(
    {
      orientation = "horizontal",
      decorative = true,
      className,
      ...props
    },
    ref
  ) {
    const role = cond(decorative, "none", "separator");
    const ariaOrientation = cond(decorative, undefined, orientation);
    const ariaHidden = cond(decorative, true, undefined);

    return (
      <div
        ref={ref}
        role={role}
        aria-hidden={ariaHidden}
        aria-orientation={ariaOrientation}
        className={cn(variants({ orientation }), className)}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";
