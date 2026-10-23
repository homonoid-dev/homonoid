"use client";

import { forwardRef } from "react";
import { Kbd } from "../kbd/Kbd";
import { cn } from "../../utils/cn";
import type { TooltipShortcutProps } from "./types";

export const TooltipShortcut = forwardRef<HTMLElement, TooltipShortcutProps>(
  function TooltipShortcut(
    {
      children,
      className,
      size = "sm",
      variant = "plain",
      radius = "md",
      ...props
    },
    ref
  ) {
    return (
      <Kbd
        ref={ref}
        size={size}
        variant={variant}
        radius={radius}
        data-slot="shortcut"
        className={cn(
          "ml-1.5 text-inherit rounded-inherit opacity-75 border border-current/20 bg-current/10 tracking-widest",
          className
        )}
        {...props}
      >
        {children}
      </Kbd>
    );
  }
);

TooltipShortcut.displayName = "Tooltip.Shortcut";
