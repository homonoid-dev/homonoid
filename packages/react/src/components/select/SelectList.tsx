"use client";

import { forwardRef } from "react";
import { useSelectContext } from "./SelectContext";
import { cn } from "../../utils/cn";
import type { SelectListProps } from "./types";

export const SelectList = forwardRef<HTMLDivElement, SelectListProps>(
  function SelectList({ children, className, ...props }, ref) {
    const { listboxId, triggerId } = useSelectContext();

    return (
      <div
        ref={ref}
        id={listboxId}
        role="listbox"
        aria-labelledby={triggerId}
        tabIndex={-1}
        className={cn(
          "relative flex max-h-60 flex-col overflow-y-auto p-0.5 gap-0.5 select-none focus:outline-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SelectList.displayName = "Select.List";
