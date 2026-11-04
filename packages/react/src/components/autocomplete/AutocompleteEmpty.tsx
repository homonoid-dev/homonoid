"use client";

import { forwardRef, useState, useEffect } from "react";
import { useAutocompleteContext } from "./AutocompleteContext";
import { cn } from "../../utils/cn";
import { match } from "../../utils/condition";
import type { AutocompleteEmptyProps } from "./types";

const heightClasses: Record<string, string> = {
  sm: "min-h-control-sm px-control-sm-x text-xs",
  md: "min-h-control-md px-control-md-x text-xs",
  lg: "min-h-control-lg px-control-lg-x text-sm",
};

export const AutocompleteEmpty = forwardRef<HTMLDivElement, AutocompleteEmptyProps>(
  function AutocompleteEmpty(
    { children = "No results found.", className, ...props },
    ref
  ) {
    const { itemCount, size } = useAutocompleteContext();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted || itemCount > 0) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        data-empty="true"
        className={cn(
          "flex w-full items-center justify-center text-center text-muted select-none",
          match(size, heightClasses, "min-h-control-md px-control-md-x text-xs"),
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

