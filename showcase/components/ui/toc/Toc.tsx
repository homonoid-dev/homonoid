"use client";

import {
  useContext,
  useState,
  useEffect,
  useMemo,
  isValidElement,
  type ReactNode,
  type ComponentType,
} from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@homonoid/react/cn";
import { cond } from "@homonoid/react";
import { TocContext } from "./context";
import { TocItem } from "./TocItem";
import type { TocProps, TocItemModel } from "./types";

const EMPTY_ITEMS: TocItemModel[] = [];

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
  collapsed: controlledCollapsed,
}: TocProps = {}) {
  const context = useContext(TocContext);
  const items = useMemo(
    () => explicitItems ?? context?.items ?? EMPTY_ITEMS,
    [explicitItems, context?.items]
  );

  const [activeId, setActiveId] = useState<string>(
    defaultActiveId ?? items[0]?.id ?? ""
  );

  const isCurrentActiveValid = items.some((item) => item.id === activeId);
  const effectiveActiveId = cond(
    isCurrentActiveValid,
    activeId,
    defaultActiveId ?? items[0]?.id ?? ""
  );

  const isCollapsed = cond(
    controlledCollapsed !== undefined,
    Boolean(controlledCollapsed),
    Boolean(context?.collapsed)
  );

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      setActiveId(id);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
