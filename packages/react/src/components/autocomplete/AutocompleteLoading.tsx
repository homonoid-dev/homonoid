"use client";

import { forwardRef } from "react";
import { Spinner } from "../spinner/Spinner";
import { useAutocompleteContext } from "./AutocompleteContext";
import { cn } from "../../utils/cn";
import { match } from "../../utils/condition";
import type { AutocompleteLoadingProps } from "./types";

const heightClasses: Record<string, string> = {
  sm: "min-h-control-sm px-3 text-xs",
  md: "min-h-control-md px-3.5 text-xs",
  lg: "min-h-control-lg px-4.5 text-sm",
};

export const AutocompleteLoading = forwardRef<HTMLDivElement, AutocompleteLoadingProps>(
  function AutocompleteLoading(
    { children = "Loading options...", className, ...props },
    ref
  ) {
    const { loading, size } = useAutocompleteContext();

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
          "flex w-full items-center justify-center gap-2 text-center text-muted select-none",
          match(size, heightClasses, "min-h-control-md px-3.5 text-xs"),
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

