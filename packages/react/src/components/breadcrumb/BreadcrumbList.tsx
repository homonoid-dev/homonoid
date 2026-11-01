"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { match } from "../../utils/condition";
import { useBreadcrumbContext } from "./BreadcrumbContext";
import type { BreadcrumbListProps } from "./types";

export const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  function BreadcrumbList({ className, children, ...props }, ref) {
    const { size } = useBreadcrumbContext();

    const sizeClasses = match(
      size,
      {
        sm: "gap-1.5 text-xs",
        md: "gap-2 text-sm",
        lg: "gap-2.5 text-base",
      },
      "gap-2 text-sm"
    );

    return (
      <ol
        ref={ref}
        className={cn(
          "flex flex-wrap items-center break-words text-muted",
          sizeClasses,
          className
        )}
        {...props}
      >
        {children}
      </ol>
    );
  }
);

BreadcrumbList.displayName = "Breadcrumb.List";

