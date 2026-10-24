"use client";

import { forwardRef } from "react";
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
        aria-hidden="true"
        className={className}
        {...props}
      >
        {children}
      </span>
    );
  }
);

KbdContent.displayName = "Kbd.Content";
