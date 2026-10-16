"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, cond } from "@harmonia/react";
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
          <Link href={prevItem.href}>
            <Button
              variant="outlined"
              color="surface"
              shape="circle"
              leading={<ArrowLeft className="size-4" />}
            >
              {prevItem.name}
            </Button>
          </Link>
        )}
      </div>

      <div className="ml-auto text-right">
        {nextItem && (
          <Link href={nextItem.href}>
            <Button
              variant="outlined"
              color="surface"
              shape="circle"
              trailing={<ArrowRight className="size-4" />}
            >
              {nextItem.name}
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
