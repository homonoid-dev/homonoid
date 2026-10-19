"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { ModalHeaderProps } from "./types";

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  function ModalHeader({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "px-surface pt-surface pb-control-y flex items-center justify-between gap-surface-gap shrink-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalHeader.displayName = "Modal.Header";
