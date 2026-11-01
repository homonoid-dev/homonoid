"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { BreadcrumbItemProps } from "./types";

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ className, children, ...props }, ref) {
    return (
      <li
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
      >
        {children}
      </li>
    );
  }
);

BreadcrumbItem.displayName = "Breadcrumb.Item";

