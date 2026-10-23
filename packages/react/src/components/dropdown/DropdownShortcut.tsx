"use client";

import { forwardRef } from "react";
import { Kbd } from "../kbd/Kbd";
import { cn } from "../../utils/cn";
import type { DropdownShortcutProps } from "./types";
import { cond } from "../../utils/condition";

export const DropdownShortcut = forwardRef<HTMLElement, DropdownShortcutProps>(
  function DropdownShortcut(
    {
      children,
      className,
      size = "md",
      variant = "plain",
      ...props
    },
    ref
  ) {
    return (
      <Kbd
        ref={ref}
        size={size}
        variant={variant}
        data-slot="shortcut"
        className={cn(
          "ml-auto text-muted tracking-widest",
          cond(variant === "plain", "px-0", ""),
          className
        )}
        {...props}
      >
        {children}
      </Kbd>
    );
  }
);

DropdownShortcut.displayName = "Dropdown.Shortcut";
