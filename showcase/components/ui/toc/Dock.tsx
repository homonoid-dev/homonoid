"use client";

import {
  useContext,
  useRef,
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
  return <IconComponent className="size-4" />;
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

  const activeId = context?.activeId ?? defaultActiveId ?? items[0]?.id ?? "";
  const isCurrentActiveValid = items.some((item) => item.id === activeId);
  const effectiveActiveId = cond(
    isCurrentActiveValid,
    activeId,
    defaultActiveId ?? items[0]?.id ?? ""
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    if (!effectiveActiveId) return;

    const timer = setTimeout(() => {
      const container = scrollRef.current;
      const itemEl = itemRefs.current.get(effectiveActiveId);
      if (!container || !itemEl) return;

      const containerWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;
      const maxScroll = scrollWidth - containerWidth;
      if (maxScroll <= 0) return;

      const itemLeft = itemEl.offsetLeft;
      const itemWidth = itemEl.offsetWidth;
      const itemCenter = itemLeft + itemWidth / 2;
      const targetScroll = itemCenter - containerWidth / 2;

      const clampedScroll = Math.max(0, Math.min(maxScroll, targetScroll));
      container.scrollTo({
        left: clampedScroll,
        behavior: "smooth",
      });
    }, 60);

    return () => clearTimeout(timer);
  }, [effectiveActiveId]);

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

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents dock"
      className={cn(
        "fixed bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)] left-1/2 -translate-x-1/2 z-30 md:hidden",
        "max-w-[calc(100vw-2.5rem)] pointer-events-auto select-none",
        className
      )}
    >
      <div className="flex items-center p-1.5 rounded-full bg-surface/90 backdrop-blur-md border-[0.5px] border-border/80 shadow-md">
        <div
          ref={scrollRef}
          className="flex items-center gap-1 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-0.5"
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
                    "h-8 px-3 gap-1.5 bg-foreground text-background shadow-xs",
                    "size-8 justify-center text-muted hover:text-foreground hover:bg-surface-hover active:bg-surface-active"
                  )
                )}
              >
                {when(
                  Boolean(item.icon),
                  <span className="shrink-0">{renderIcon(item.icon)}</span>
                )}
                {when(
                  isSelected,
                  <span className="whitespace-nowrap truncate max-w-32">
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
