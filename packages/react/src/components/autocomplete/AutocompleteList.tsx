"use client";

import { forwardRef } from "react";
import { useAutocompleteContext } from "./AutocompleteContext";
import { cn } from "../../utils/cn";
import type { AutocompleteListProps } from "./types";

export const AutocompleteList = forwardRef<HTMLDivElement, AutocompleteListProps>(
  function AutocompleteList({ children, className, ...props }, ref) {
    const { listboxId, inputId } = useAutocompleteContext();

    return (
      <div
        ref={ref}
        id={listboxId}
        role="listbox"
        aria-labelledby={inputId}
        tabIndex={-1}
        className={cn(
          "relative flex max-h-72 flex-col overflow-y-auto p-0.5 gap-0.5 select-none focus:outline-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AutocompleteList.displayName = "Autocomplete.List";

