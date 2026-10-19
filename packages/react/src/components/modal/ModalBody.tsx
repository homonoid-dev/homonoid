"use client";

import { forwardRef } from "react";
import { useModalContext } from "./ModalContext";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { ModalBodyProps } from "./types";

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  function ModalBody({ children, className, ...props }, ref) {
    const { scroll } = useModalContext();

    return (
      <div
        ref={ref}
        className={cn(
          "px-surface py-control-y text-sm text-foreground/85 flex-1",
          cond(scroll === "inside", "overflow-y-auto overscroll-contain", ""),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalBody.displayName = "Modal.Body";
