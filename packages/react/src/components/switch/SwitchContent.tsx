"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { ControlContext } from "../../utils/control-context";
import { useSwitchContext } from "./SwitchContext";
import type { SwitchContentProps } from "./types";

export const SwitchContent = forwardRef<HTMLSpanElement, SwitchContentProps>(
  function SwitchContent({ className, children, ...props }, ref) {
    const { size } = useSwitchContext();

    return (
      <ControlContext.Provider value={{ size, control: "switch" }}>
        <span
          ref={ref}
          className={cn("flex flex-col select-none", className)}
          {...props}
        >
          {children}
        </span>
      </ControlContext.Provider>
    );
  }
);

SwitchContent.displayName = "Switch.Content";
