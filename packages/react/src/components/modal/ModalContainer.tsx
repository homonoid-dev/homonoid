"use client";

import { forwardRef } from "react";
import { useModalContext } from "./ModalContext";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { ModalContainerProps } from "./types";

export const ModalContainer = forwardRef<HTMLDivElement, ModalContainerProps>(
  function ModalContainer({ children, className, ...props }, ref) {
    const { size, scroll } = useModalContext();

    return (
      <div
        ref={ref}
        className={cn(
          "w-full min-h-full flex justify-center pointer-events-none",
          cond(scroll === "outside", "items-start py-surface", "items-center"),
          cond(size === "full", "p-0", "px-surface"),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalContainer.displayName = "Modal.Container";
