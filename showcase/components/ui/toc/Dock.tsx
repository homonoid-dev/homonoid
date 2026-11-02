"use client";

import {
  useContext,
  useRef,
  useState,
  useEffect,
  useMemo,
  isValidElement,
  type ReactNode,
  type ComponentType,
} from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@homonoid/react/cn";
import { cond, when } from "@homonoid/react";
import { TocContext } from "./context";
import type { DockProps, TocItemModel } from "./types";

const EMPTY_ITEMS: TocItemModel[] = [];

function renderIcon(
  icon?: LucideIcon | ComponentType<{ className?: string }> | ReactNode
) {
  if (!icon) return null;
  if (isValidElement(icon)) return icon;
  const IconComponent = icon as ComponentType<{ className?: string }>;
  return <IconComponent className="size-4 shrink-0" />;
}

export function Dock({
  items: explicitItems,
  className,
  defaultActiveId,
}: DockProps = {}) {
  const context = useContext(TocContext);
  const items = useMemo(
    () => explicitItems ?? context?.items ?? EMPTY_ITEMS,
    [explicitItems, context?.items]
  );

  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    setIsPointerFine(mql.matches);
    const update = (e: MediaQueryListEvent) => setIsPointerFine(e.matches);
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const activeId = context?.activeId ?? defaultActiveId ?? items[0]?.id ?? "";
  const isCurrentActiveValid = items.some((item) => item.id === activeId);
  const effectiveActiveId = cond(
    isCurrentActiveValid,
    activeId,
    defaultActiveId ?? items[0]?.id ?? ""
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    if (!effectiveActiveId || isPointerFine) return;

    const timer = setTimeout(() => {
      const container = scrollContainerRef.current;
      const itemEl = itemRefs.current.get(effectiveActiveId);
      if (!container || !itemEl) return;

      const isLast = items[items.length - 1]?.id === effectiveActiveId;
      const isFirst = items[0]?.id === effectiveActiveId;

      if (isFirst) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else if (isLast) {
        container.scrollTo({
          left: container.scrollWidth,
          behavior: "smooth",
        });
      } else {
        const itemLeft = itemEl.offsetLeft;
        const itemWidth = itemEl.offsetWidth;
        const containerWidth = container.clientWidth;
        const targetScroll = itemLeft - (containerWidth - itemWidth) / 2;
        container.scrollTo({ left: targetScroll, behavior: "smooth" });
      }
    }, 40);

    return () => clearTimeout(timer);
  }, [effectiveActiveId, isPointerFine, items]);

  const handleSelect = (id: string) => {
    if (context?.scrollToSection) {
      context.scrollToSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        context?.setActiveId?.(id);
        const yOffset = -24;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  if (isPointerFine || !items || items.length === 0) return null;

  return (
    <nav
      data-slot="toc-dock"
      aria-label="Table of contents dock"
      className={cn(
        "fixed bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)] left-1/2 -translate-x-1/2 z-30 lg:hidden",
        "w-[calc(100vw-var(--p-layout-x)*2)] pointer-events-auto select-none",
        className
      )}
    >
      <div className="flex items-center p-1 rounded-full bg-surface/90 backdrop-blur-md border-[0.5px] border-border/80 shadow-md w-full overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-1.5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-2.5 w-full"
        >
          {items.map((item) => {
            const isSelected = effectiveActiveId === item.id;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  if (el) itemRefs.current.set(item.id, el);
                  else itemRefs.current.delete(item.id);
                }}
                type="button"
                onClick={() => handleSelect(item.id)}
                aria-label={item.label}
                aria-current={cond(isSelected, "location", undefined)}
                className={cn(
                  "flex items-center rounded-full text-xs font-medium cursor-pointer shrink-0",
                  "transition-all duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] motion-reduce:transition-none",
                  cond(
                    isSelected,
                    "h-8 px-3 bg-foreground text-background shadow-xs",
                    "size-8 justify-center text-muted hover:text-foreground hover:bg-surface-hover active:bg-surface-active"
                  )
                )}
              >
                {renderIcon(item.icon)}
                {when(
                  isSelected,
                  <span className="whitespace-nowrap pl-1.5 pr-0.5 truncate max-w-32 transition-opacity duration-[var(--motion-duration-fast)]">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
