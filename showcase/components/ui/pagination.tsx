"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
        "flex items-center justify-between w-full pt-layout-y select-none",
        className
      )}
    >
      <div>
        {prevItem && (
          <Link
            href={prevItem.href}
            className="group inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors py-2"
          >
            <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-1 text-muted group-hover:text-foreground" />
            <span className="font-medium text-foreground transition-colors group-hover:text-primary">
              {prevItem.name}
            </span>
          </Link>
        )}
      </div>

      <div className="ml-auto text-right">
        {nextItem && (
          <Link
            href={nextItem.href}
            className="group inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors py-2"
          >
            <span className="font-medium text-foreground transition-colors group-hover:text-primary">
              {nextItem.name}
            </span>
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 text-muted group-hover:text-foreground" />
          </Link>
        )}
      </div>
    </nav>
  );
}
