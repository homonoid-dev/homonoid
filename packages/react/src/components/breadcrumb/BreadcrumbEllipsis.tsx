"use client";

import { forwardRef } from "react";
import { MoreHorizontal } from "lucide-react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { BreadcrumbEllipsisProps } from "./types";

export const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(
  function BreadcrumbEllipsis({ className, onClick, ...props }, ref) {
    const isInteractive = Boolean(onClick);

    return (
      <span
        ref={ref}
        role={cond(isInteractive, "button", "presentation")}
        tabIndex={cond(isInteractive, 0, undefined)}
        onClick={onClick}
        onKeyDown={cond(
          isInteractive,
          (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClick?.(e as unknown as React.MouseEvent<HTMLSpanElement>);
            }
          },
          undefined
        )}
        aria-label={props["aria-label"] || "More"}
        className={cn(
          "flex items-center justify-center size-5 text-muted transition-colors rounded-xs",
          cond(
            isInteractive,
            "cursor-pointer hover:text-foreground hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
            "select-none"
          ),
          className
        )}
        {...props}
      >
        <MoreHorizontal className="size-3.5 shrink-0" />
        <span className="sr-only">{props["aria-label"] || "More"}</span>
      </span>
    );
  }
);

BreadcrumbEllipsis.displayName = "Breadcrumb.Ellipsis";

