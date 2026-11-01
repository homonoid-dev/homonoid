"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { EmptyHeaderProps } from "./types";

export const EmptyHeader = forwardRef<HTMLDivElement, EmptyHeaderProps>(
  function EmptyHeader({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="empty-header"
        className={cn(
          "flex flex-col items-center justify-center text-center gap-1",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

EmptyHeader.displayName = "Empty.Header";

