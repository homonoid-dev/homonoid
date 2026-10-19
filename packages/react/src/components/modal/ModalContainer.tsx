"use client";

import { forwardRef } from "react";
import { ModalContext, useModalContext } from "./ModalContext";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { ModalContainerProps, ModalSize } from "./types";

export const ModalContainer = forwardRef<HTMLDivElement, ModalContainerProps>(
  function ModalContainer(
    { children, size: propSize, className, ...props },
    ref
  ) {
    const context = useModalContext();
    const activeSize = cond(
      Boolean(propSize),
      propSize as ModalSize,
      context.size
    );

    const containerNode = (
      <div
        ref={ref}
        className={cn(
          "w-full min-h-full flex justify-center pointer-events-none",
          cond(
            context.scroll === "outside",
            "items-start py-surface",
            "items-center"
          ),
          cond(activeSize === "full", "p-0", "px-surface"),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );

    if (Boolean(propSize)) {
      return (
        <ModalContext.Provider value={{ ...context, size: activeSize }}>
          {containerNode}
        </ModalContext.Provider>
      );
    }

    return containerNode;
  }
);

ModalContainer.displayName = "Modal.Container";
