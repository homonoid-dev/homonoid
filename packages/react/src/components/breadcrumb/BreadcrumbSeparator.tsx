"use client";

import { forwardRef } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";
import { useBreadcrumbContext } from "./BreadcrumbContext";
import type { BreadcrumbSeparatorProps } from "./types";

export const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
  function BreadcrumbSeparator({ className, children, ...props }, ref) {
    const { separator: contextSeparator } = useBreadcrumbContext();
    const fallbackSeparator = contextSeparator ?? <ChevronRight className="size-3.5" />;

    return (
      <li
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cn("select-none text-muted shrink-0 flex items-center justify-center", className)}
        {...props}
      >
        {children ?? fallbackSeparator}
      </li>
    );
  }
);

BreadcrumbSeparator.displayName = "Breadcrumb.Separator";

