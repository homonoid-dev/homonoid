"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useSwitchContext } from "./SwitchContext";
import type { SwitchContentProps } from "./types";

export const SwitchContent = forwardRef<HTMLSpanElement, SwitchContentProps>(
  function SwitchContent({ className, children, ...props }, ref) {
    const { size } = useSwitchContext();

    return (
      <span
        ref={ref}
        className={cn(
          "flex flex-col select-none",
          cond(
            size === "sm",
            "[&>[data-slot=label]]:min-h-4 [&>[data-slot=label]]:flex [&>[data-slot=label]]:items-center [&>[data-slot=label]]:text-xs [&>[data-slot=label]]:font-medium [&>[data-slot=label]]:leading-4 [&>h1]:min-h-4 [&>h1]:flex [&>h1]:items-center [&>h1]:text-xs [&>h1]:font-medium [&>h1]:leading-4 [&>span]:min-h-4 [&>span]:flex [&>span]:items-center [&>span]:text-xs [&>span]:font-medium [&>span]:leading-4 [&>[data-slot=description]]:mt-0.5 [&>[data-slot=description]]:text-[11px] [&>[data-slot=description]]:leading-tight [&>p]:mt-0.5 [&>p]:text-[11px] [&>p]:leading-tight",
            cond(
              size === "lg",
              "[&>[data-slot=label]]:min-h-8 [&>[data-slot=label]]:flex [&>[data-slot=label]]:items-center [&>[data-slot=label]]:text-base [&>[data-slot=label]]:font-medium [&>[data-slot=label]]:leading-8 [&>h1]:min-h-8 [&>h1]:flex [&>h1]:items-center [&>h1]:text-base [&>h1]:font-medium [&>h1]:leading-8 [&>span]:min-h-8 [&>span]:flex [&>span]:items-center [&>span]:text-base [&>span]:font-medium [&>span]:leading-8 [&>[data-slot=description]]:mt-1 [&>[data-slot=description]]:text-sm [&>[data-slot=description]]:leading-tight [&>p]:mt-1 [&>p]:text-sm [&>p]:leading-tight",
              "[&>[data-slot=label]]:min-h-6 [&>[data-slot=label]]:flex [&>[data-slot=label]]:items-center [&>[data-slot=label]]:text-sm [&>[data-slot=label]]:font-medium [&>[data-slot=label]]:leading-6 [&>h1]:min-h-6 [&>h1]:flex [&>h1]:items-center [&>h1]:text-sm [&>h1]:font-medium [&>h1]:leading-6 [&>span]:min-h-6 [&>span]:flex [&>span]:items-center [&>span]:text-sm [&>span]:font-medium [&>span]:leading-6 [&>[data-slot=description]]:mt-0.5 [&>[data-slot=description]]:text-xs [&>[data-slot=description]]:leading-tight [&>p]:mt-0.5 [&>p]:text-xs [&>p]:leading-tight"
            )
          ),
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

SwitchContent.displayName = "Switch.Content";
