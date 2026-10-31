"use client";

import { forwardRef } from "react";
import { Spinner } from "../spinner/Spinner";
import { useAutocompleteContext } from "./AutocompleteContext";
import { cn } from "../../utils/cn";
import type { AutocompleteLoadingProps } from "./types";

export const AutocompleteLoading = forwardRef<HTMLDivElement, AutocompleteLoadingProps>(
  function AutocompleteLoading(
    { children = "Loading options...", className, ...props },
    ref
  ) {
    const { loading } = useAutocompleteContext();

    if (!loading) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        data-loading="true"
        className={cn(
          "flex items-center justify-center gap-2 px-4 py-6 text-xs text-muted select-none",
          className
        )}
        {...props}
      >
        <Spinner size="sm" aria-hidden="true" />
        <span>{children}</span>
      </div>
    );
  }
);

AutocompleteLoading.displayName = "Autocomplete.Loading";

