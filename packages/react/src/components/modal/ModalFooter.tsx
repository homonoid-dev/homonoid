"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { ModalFooterProps } from "./types";

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  function ModalFooter({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "px-surface pb-surface pt-control-y flex items-center justify-end gap-control-gap shrink-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = "Modal.Footer";
