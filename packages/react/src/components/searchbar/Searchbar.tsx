"use client";

import {
  forwardRef,
  type KeyboardEvent,
} from "react";
import { Input } from "../input/Input";
import { Kbd } from "../kbd/Kbd";
import { cn } from "../../utils/cn";
import { cond, when } from "../../utils/condition";
import type { SearchbarProps, SearchbarRadius } from "./types";

const radiuses: Record<SearchbarRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export const Searchbar = forwardRef<HTMLInputElement, SearchbarProps>(
  function Searchbar(
    {
      size = "md",
      variant = "outlined",
      radius,
      loading = false,
      leading,
      trailing,
      shortcut,
      onSearch,
      onKeyDown,
      className,
      ...props
    },
    ref
  ) {
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
      if (event.key === "Enter" && !event.defaultPrevented) {
        onSearch?.(event.currentTarget.value);
      }
    };

    return (
      <Input
        ref={ref}
        type="search"
        role="searchbox"
        aria-busy={cond(loading, true, undefined)}
        size={size}
        variant={variant}
        leading={leading}
        trailing={cond(
          trailing,
          trailing,
          when(
            shortcut,
            <Kbd size={size} radius={radius} className="pointer-events-none">
              {shortcut}
            </Kbd>
          )
        )}
        onKeyDown={handleKeyDown}
        className={cn(
          radius && radiuses[radius],
          className
        )}
        {...props}
      />
    );
  }
);

Searchbar.displayName = "Searchbar";
