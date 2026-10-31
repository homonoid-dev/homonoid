"use client";

import { forwardRef } from "react";
import { useAutocompleteContext } from "./AutocompleteContext";
import { cn } from "../../utils/cn";
import type { AutocompleteEmptyProps } from "./types";

export const AutocompleteEmpty = forwardRef<HTMLDivElement, AutocompleteEmptyProps>(
  function AutocompleteEmpty(
    { children = "No results found.", className, ...props },
    ref
  ) {
    const { registeredItems, loading } = useAutocompleteContext();

    if (loading || registeredItems.length > 0) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        data-empty="true"
        className={cn(
          "px-4 py-6 text-center text-xs text-muted select-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AutocompleteEmpty.displayName = "Autocomplete.Empty";

