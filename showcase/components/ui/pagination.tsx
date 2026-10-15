"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "@harmonia/react";
import { cond } from "@harmonia/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@harmonia/react/cn";
import { SHOWCASE_COMPONENTS, type ShowcaseComponentItem } from "@/config/components";

export interface PaginationProps {
  prev?: ShowcaseComponentItem | null;
  next?: ShowcaseComponentItem | null;
  className?: string;
}

export function Pagination({
  prev: explicitPrev,
  next: explicitNext,
  className,
}: PaginationProps) {
  const pathname = usePathname();

  const currentIndex = SHOWCASE_COMPONENTS.findIndex(
    (item) => item.href === pathname
  );

  const prevItem = cond(
    explicitPrev !== undefined,
    explicitPrev,
    cond(currentIndex > 0, SHOWCASE_COMPONENTS[currentIndex - 1], null)
  );

  const nextItem = cond(
    explicitNext !== undefined,
    explicitNext,
    cond(
      currentIndex >= 0 && currentIndex < SHOWCASE_COMPONENTS.length - 1,
      SHOWCASE_COMPONENTS[currentIndex + 1],
      null
    )
  );

  const hasAny = Boolean(prevItem || nextItem);
  if (!hasAny) return null;

  return (
    <nav
      aria-label="Component pagination"
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 gap-surface-gap w-full pt-layout-y border-t border-border/50",
        className
      )}
    >
      <div>
        {prevItem && (
          <Link href={prevItem.href} className="block group h-full">
            <Card
              variant="outlined"
              color="surface"
              className="h-full flex flex-col justify-center p-surface gap-1 transition-all duration-200 hover:border-primary/50 hover:bg-surface/30 cursor-pointer"
            >
              <span className="text-xs text-muted flex items-center gap-1.5 select-none">
                <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1 text-muted group-hover:text-foreground" />
                Previous
              </span>
              <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                {prevItem.name}
              </span>
            </Card>
          </Link>
        )}
      </div>

      <div className="sm:text-right">
        {nextItem && (
          <Link href={nextItem.href} className="block group h-full">
            <Card
              variant="outlined"
              color="surface"
              className="h-full flex flex-col justify-center sm:items-end p-surface gap-1 transition-all duration-200 hover:border-primary/50 hover:bg-surface/30 cursor-pointer"
            >
              <span className="text-xs text-muted flex items-center sm:justify-end gap-1.5 select-none">
                Next
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1 text-muted group-hover:text-foreground" />
              </span>
              <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                {nextItem.name}
              </span>
            </Card>
          </Link>
        )}
      </div>
    </nav>
  );
}
