"use client";

import {
  forwardRef,
  type KeyboardEvent,
} from "react";
import { Input } from "../input/Input";
import { cond } from "../../utils/condition";
import type { SearchbarProps } from "./types";

export const Searchbar = forwardRef<HTMLInputElement, SearchbarProps>(
  function Searchbar(
    {
      size = "md",
      variant = "outlined",
      radius,
      loading = false,
      leading,
      trailing,
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
        radius={radius}
        leading={leading}
        trailing={trailing}
        onKeyDown={handleKeyDown}
        className={className}
        {...props}
      />
    );
  }
);

Searchbar.displayName = "Searchbar";
