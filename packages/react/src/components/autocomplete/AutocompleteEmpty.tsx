"use client";

import { forwardRef, isValidElement } from "react";
import { useAutocompleteContext } from "./AutocompleteContext";
import { Description } from "../description/Description";
import { cn } from "../../utils/cn";
import { cond, match } from "../../utils/condition";
import type { AutocompleteEmptyProps } from "./types";

const heightClasses: Record<string, string> = {
  sm: "min-h-control-sm px-control-sm-x",
  md: "min-h-control-md px-control-md-x",
  lg: "min-h-control-lg px-control-lg-x",
};

export const AutocompleteEmpty = forwardRef<HTMLDivElement, AutocompleteEmptyProps>(
  function AutocompleteEmpty(
    { children = "No results found.", className, ...props },
    ref
  ) {
    const { itemCount, size } = useAutocompleteContext();

    if (itemCount > 0) {
      return null;
    }

    const contentNode = cond(
      isValidElement(children),
      children,
      <Description as="p" size={size} variant="muted">
        {children}
      </Description>
    );

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        data-empty="true"
        className={cn(
          "flex w-full items-center justify-center text-center select-none py-control-sm-y",
          match(size, heightClasses, "min-h-control-md px-control-md-x"),
          className
        )}
        {...props}
      >
        {contentNode}
      </div>
    );
  }
);

AutocompleteEmpty.displayName = "Autocomplete.Empty";
