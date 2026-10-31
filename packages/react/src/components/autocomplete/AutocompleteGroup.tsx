"use client";

import { forwardRef, useId } from "react";
import { Label } from "../label/Label";
import { cn } from "../../utils/cn";
import { cond, when } from "../../utils/condition";
import type { AutocompleteGroupProps } from "./types";

export const AutocompleteGroup = forwardRef<HTMLDivElement, AutocompleteGroupProps>(
  function AutocompleteGroup({ heading, children, className, ...props }, ref) {
    const generatedId = useId();

    return (
      <div
        ref={ref}
        role="group"
        aria-labelledby={cond(Boolean(heading), generatedId, undefined)}
        className={cn("flex flex-col gap-0.5", className)}
        {...props}
      >
        {when(
          heading,
          <Label
            id={generatedId}
            as="span"
            className="px-3 py-1.5 text-xs text-muted font-medium select-none pointer-events-none cursor-default"
          >
            {heading}
          </Label>
        )}
        {children}
      </div>
    );
  }
);

AutocompleteGroup.displayName = "Autocomplete.Group";

