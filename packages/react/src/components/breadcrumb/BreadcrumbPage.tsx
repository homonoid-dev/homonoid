"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { BreadcrumbPageProps } from "./types";

export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  function BreadcrumbPage({ className, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={cn("inline-flex items-center gap-1.5 font-medium text-foreground select-none", className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

BreadcrumbPage.displayName = "Breadcrumb.Page";

