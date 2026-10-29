"use client";

import {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  isValidElement,
  type ReactNode,
  type ComponentType,
} from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@homonoid/react/cn";
import { cond } from "@homonoid/react";
import { TocContext } from "./context";
import { TocItem } from "./TocItem";
import type { TocProps } from "./types";

const EMPTY_ITEMS: TocItem[] = [];

function renderIcon(
  icon?: LucideIcon | ComponentType<{ className?: string }> | ReactNode
) {
  if (!icon) return null;
  if (isValidElement(icon)) return icon;
  const IconComponent = icon as ComponentType<{ className?: string }>;
  return <IconComponent className="size-4" />;
}

export function Toc({
  items: explicitItems,
  className,
  defaultActiveId,
  collapsible = true,
  collapsed: controlledCollapsed,
  collapseBreakpoint = 920,
}: TocProps = {}) {
  const context = useContext(TocContext);
  const items = useMemo(
    () => explicitItems ?? context?.items ?? EMPTY_ITEMS,
    [explicitItems, context?.items]
  );
  const setContextCollapsed = context?.setCollapsed;

  const [activeId, setActiveId] = useState<string>(
    defaultActiveId ?? items[0]?.id ?? ""
  );
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  const isCurrentActiveValid = items.some((item) => item.id === activeId);
  const effectiveActiveId = cond(
    isCurrentActiveValid,
    activeId,
    defaultActiveId ?? items[0]?.id ?? ""
  );

  const isCollapsed =
    collapsible &&
    cond(
      controlledCollapsed !== undefined,
      Boolean(controlledCollapsed),
      internalCollapsed
    );

  useEffect(() => {
    if (!collapsible || controlledCollapsed !== undefined) return;

    const mql = window.matchMedia(`(max-width: ${collapseBreakpoint}px)`);
    const update = (e: MediaQueryListEvent | MediaQueryList) => {
      setInternalCollapsed(e.matches);
      setContextCollapsed?.(e.matches);
    };

    update(mql);

    if (mql.addEventListener) {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    } else {
      mql.addListener(update);
      return () => mql.removeListener(update);
    }
  }, [collapsible, controlledCollapsed, collapseBreakpoint, setContextCollapsed]);

  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!items || items.length === 0) return;

    const ids = items.map((item) => item.id);

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (scrollY + innerHeight >= scrollHeight - 32) {
        const lastId = ids[ids.length - 1];
        if (lastId) {
          setActiveId(lastId);
          return;
        }
      }

      const readingOffset = 160;
      let matchedId = ids[0] ?? "";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= readingOffset) {
          matchedId = id;
        } else {
          break;
        }
      }

      if (matchedId) {
        setActiveId(matchedId);
      }
    };

    const handleScrollEnd = () => {
      isScrollingRef.current = false;
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };

    const handleUserInteraction = () => {
      isScrollingRef.current = false;
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scrollend", handleScrollEnd);
    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchmove", handleUserInteraction, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scrollend", handleScrollEnd);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      window.removeEventListener("resize", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [items]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      isScrollingRef.current = true;
      setActiveId(id);
      el.scrollIntoView({ behavior: "smooth", block: "start" });

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "sticky top-0 self-start h-screen shrink-0 border-l-[0.5px] border-border/50 bg-background transition-[width] duration-300 ease-in-out select-none",
        cond(isCollapsed, "w-[calc(var(--p-layout-x)*2+1rem)]", "w-58"),
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-control-gap p-surface-sm h-full overflow-y-auto overflow-x-hidden",
          cond(isCollapsed, "items-center", "")
        )}
      >
        {items.map((item) => (
          <TocItem
            key={item.id}
            href={`#${item.id}`}
            label={item.label}
            icon={renderIcon(item.icon)}
            active={effectiveActiveId === item.id}
            collapsed={isCollapsed}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(item.id);
            }}
          />
        ))}
      </div>
    </nav>
  );
}

Toc.Item = TocItem;
