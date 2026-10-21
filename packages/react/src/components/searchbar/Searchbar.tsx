"use client";

import {
  forwardRef,
  type KeyboardEvent,
} from "react";
import { Input } from "../input/Input";
import { Spinner } from "../spinner/Spinner";
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

function SearchIcon({ size }: { size: "sm" | "md" | "lg" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={cn(
        "shrink-0 text-muted transition-colors duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)]",
        cond(size === "sm", "size-3.5", cond(size === "lg", "size-5", "size-4"))
      )}
    >
      <path
        d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

    const spinnerSize = cond(size === "lg", "md", "sm");
    const spinnerClass = cond(size === "sm", "size-3.5", cond(size === "lg", "size-5", "size-4"));

    const leadingContent = cond(
      loading,
      <Spinner size={spinnerSize} className={cn(spinnerClass, "text-muted")} />,
      leading ?? <SearchIcon size={size} />
    );

    const trailingContent = trailing ?? (
      shortcut ? (
        <kbd
          className={cn(
            "inline-flex items-center justify-center font-mono font-medium text-muted bg-surface border border-border rounded shadow-xs select-none pointer-events-none",
            cond(
              size === "sm",
              "text-[10px] px-1 py-0.5 min-w-4",
              cond(size === "lg", "text-xs px-1.5 py-0.5 min-w-5", "text-xs px-1.5 py-0.5 min-w-4.5")
            )
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
        leading={leadingContent}
        trailing={trailingContent}
        onKeyDown={handleKeyDown}
        className={cn(
          "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
          radius && radiusClasses[radius],
          className
        )}
        {...props}
      />
    );
  }
);

Searchbar.displayName = "Searchbar";
