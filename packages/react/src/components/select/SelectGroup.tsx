"use client";

import { forwardRef, useId } from "react";
import { Label } from "../label/Label";
import { cn } from "../../utils/cn";
import { cond, when } from "../../utils/condition";
import type { SelectGroupProps } from "./types";

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  function SelectGroup({ label, children, className, ...props }, ref) {
    const generatedId = useId();

    return (
      <div
        ref={ref}
        role="group"
        aria-labelledby={cond(Boolean(label), generatedId, undefined)}
        className={cn("flex flex-col gap-0.5", className)}
        {...props}
      >
        {when(
          label,
          <Label
            id={generatedId}
            as="span"
            className="px-3 py-1.5 text-xs text-muted font-medium select-none pointer-events-none cursor-default"
          >
            {label}
          </Label>
        )}
        {children}
      </div>
    );
  }
);

SelectGroup.displayName = "Select.Group";
