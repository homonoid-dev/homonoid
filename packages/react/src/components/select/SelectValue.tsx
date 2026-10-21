"use client";

import { forwardRef } from "react";
import { useSelectContext } from "./SelectContext";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { SelectValueProps } from "./types";

export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(
  function SelectValue(
    { placeholder: explicitPlaceholder, className, children, ...props },
    ref
  ) {
    const { selectedLabel, placeholder: contextPlaceholder } =
      useSelectContext();
    const activePlaceholder = cond(
      Boolean(explicitPlaceholder),
      explicitPlaceholder,
      cond(Boolean(contextPlaceholder), contextPlaceholder, "Select option")
    );

    const hasSelection = Boolean(selectedLabel);

    return (
      <span
        ref={ref}
        data-slot="select-value"
        className={cn(
          "block flex-1 truncate text-left",
          cond(hasSelection, "text-inherit", "text-muted"),
          className
        )}
        {...props}
      >
        {cond(
          Boolean(children),
          children,
          cond(hasSelection, selectedLabel, activePlaceholder)
        )}
      </span>
    );
  }
);

SelectValue.displayName = "Select.Value";
