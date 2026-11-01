"use client";

import {
  forwardRef,
  cloneElement,
  isValidElement,
  type ReactElement,
} from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { BreadcrumbLinkProps } from "./types";

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  function BreadcrumbLink(
    { as: Component = "a", asChild = false, disabled = false, className, children, ...props },
    ref
  ) {
    const linkClasses = cn(
      "transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-easing)]",
      "text-muted hover:text-foreground",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-xs",
      cond(disabled, "opacity-50 pointer-events-none cursor-not-allowed", undefined),
      className
    );

    if (asChild && isValidElement(children)) {
      const child = children as ReactElement<{ className?: string; ref?: unknown }>;
      return cloneElement(child, {
        ref,
        className: cn(linkClasses, child.props.className),
        ...props,
      });
    }

    return (
      <Component
        ref={ref}
        aria-disabled={cond(disabled, true, undefined)}
        className={linkClasses}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

BreadcrumbLink.displayName = "Breadcrumb.Link";

