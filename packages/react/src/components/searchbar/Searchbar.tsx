"use client";

import {
  forwardRef,
  type KeyboardEvent,
} from "react";
import { Input } from "../input/Input";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { SearchbarProps, SearchbarRadius } from "./types";

const radiusClasses: Record<SearchbarRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const shortcutRadiusClasses: Record<SearchbarRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full px-2",
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

    const shortcutRadiusClass = radius
      ? shortcutRadiusClasses[radius]
      : cond(size === "lg", "rounded-md", "rounded-sm");

    const trailingContent = trailing ?? (
      shortcut ? (
        <kbd
          className={cn(
            "inline-flex items-center justify-center font-mono font-medium text-muted bg-surface border border-border select-none pointer-events-none",
            cond(
              size === "sm",
              "text-[10px] px-1 min-w-4",
              cond(size === "lg", "text-xs px-1.5 min-w-5", "text-xs px-1.5 min-w-4.5")
            ),
            shortcutRadiusClass
          )}
        >
          {shortcut}
        </kbd>
      ) : undefined
    );

    return (
      <Input
        ref={ref}
        type="search"
        role="searchbox"
        aria-busy={cond(loading, true, undefined)}
        size={size}
        variant={variant}
        leading={leading}
        trailing={trailingContent}
        onKeyDown={handleKeyDown}
        className={cn(
          radius && radiusClasses[radius],
          className
        )}
        {...props}
      />
    );
  }
);

Searchbar.displayName = "Searchbar";
