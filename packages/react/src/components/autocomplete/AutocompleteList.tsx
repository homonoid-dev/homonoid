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
          "relative max-h-72 overflow-y-auto select-none focus:outline-none",
          className
        )}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div role="presentation" className="flex flex-col p-1.5 gap-0.5">
          {children}
        </div>
      </div>
    );
  }
);

AutocompleteList.displayName = "Autocomplete.List";
