"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { ControlContext } from "../../utils/control-context";
import { useCheckboxContext } from "./CheckboxContext";
import type { CheckboxContentProps } from "./types";

export const CheckboxContent = forwardRef<HTMLSpanElement, CheckboxContentProps>(
  function CheckboxContent({ className, children, ...props }, ref) {
    const { size } = useCheckboxContext();

    return (
      <ControlContext.Provider value={{ size, control: "checkbox" }}>
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

CheckboxContent.displayName = "Checkbox.Content";
