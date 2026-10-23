"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { KbdContentProps } from "./types";

export const KbdContent = forwardRef<HTMLSpanElement, KbdContentProps>(
  function KbdContent(
    {
      className,
      children,
      ...props
    },
    ref
  ) {
    return (
      <span
        ref={ref}
        className={cn("font-mono", className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

KbdContent.displayName = "Kbd.Content";
