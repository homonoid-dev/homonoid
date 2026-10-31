"use client";

import { forwardRef, type MouseEvent } from "react";
import { useAutocompleteContext } from "./AutocompleteContext";
import { cn } from "../../utils/cn";
import type { AutocompleteListProps } from "./types";

export const AutocompleteList = forwardRef<HTMLDivElement, AutocompleteListProps>(
  function AutocompleteList({ children, className, onMouseLeave, ...props }, ref) {
    const { listboxId, inputId, setHighlightedIndex } = useAutocompleteContext();

    const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
      setHighlightedIndex(null);
      onMouseLeave?.(e);
    };

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
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AutocompleteList.displayName = "Autocomplete.List";

