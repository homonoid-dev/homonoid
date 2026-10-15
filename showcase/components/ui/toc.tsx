"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  isValidElement,
  type ReactNode,
  type ComponentType,
} from "react";
import type { LucideIcon } from "lucide-react";
import { Sidebar } from "@/components/ui/sidebar";
import { cn } from "@harmonia/react/cn";
import { cond } from "@harmonia/react";

export interface TocItem {
  id: string;
  label: string;
  icon?: LucideIcon | ComponentType<{ className?: string }> | ReactNode;
}

export interface TocContextValue {
  items: TocItem[];
  setItems: (items: TocItem[]) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

export const TocContext = createContext<TocContextValue | null>(null);

export function TocProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <TocContext.Provider value={{ items, setItems, collapsed, setCollapsed }}>
      {children}
    </TocContext.Provider>
  );
}

export function useToc(items?: TocItem[]) {
  const context = useContext(TocContext);
  if (!context) {
    throw new Error("useToc must be used within a TocProvider");
  }

  const { setItems } = context;

  useEffect(() => {
    if (items) {
      setItems(items);
    }
  }, [items, setItems]);

  return context;
}

function renderIcon(
  icon?: LucideIcon | ComponentType<{ className?: string }> | ReactNode
) {
  if (!icon) return null;
  if (isValidElement(icon)) return icon;
  const IconComponent = icon as ComponentType<{ className?: string }>;
  return <IconComponent className="size-4" />;
}

export interface TocProps {
  items?: TocItem[];
  className?: string;
  defaultActiveId?: string;
  /**
   * Whether the Table of Contents sidebar can collapse.
   * @default true
   */
  collapsible?: boolean;
  /**
   * Controlled collapsed state.
   */
  collapsed?: boolean;
  /**
   * Screen width in pixels under which the TOC automatically collapses.
   * @default 1280
   */
  collapseBreakpoint?: number;
  /**
   * Callback fired when collapsed state changes.
   */
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function Toc({
  items: explicitItems,
  className,
  defaultActiveId,
  collapsible = true,
  collapsed: controlledCollapsed,
  collapseBreakpoint = 1280,
  onCollapsedChange,
}: TocProps = {}) {
  const context = useContext(TocContext);
  const items = explicitItems ?? context?.items ?? [];
  const contextCollapsed = context?.collapsed;
  const setContextCollapsed = context?.setCollapsed;

  const [activeId, setActiveId] = useState<string>(
    defaultActiveId ?? items[0]?.id ?? ""
  );
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  // Synchronize activeId when section items change
  useEffect(() => {
    if (items.length > 0 && !items.some((item) => item.id === activeId)) {
      setActiveId(items[0]?.id ?? "");
    }
  }, [items, activeId]);

  const effectiveControlled = controlledCollapsed ?? contextCollapsed;

  const isCollapsed =
    collapsible &&
    cond(
      effectiveControlled !== undefined,
      Boolean(effectiveControlled),
      internalCollapsed
    );

  useEffect(() => {
    if (!collapsible || effectiveControlled !== undefined) return;

    const mql = window.matchMedia(`(max-width: ${collapseBreakpoint}px)`);
    const update = (e: MediaQueryListEvent | MediaQueryList) => {
      setInternalCollapsed(e.matches);
    };

    update(mql);

    if (mql.addEventListener) {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    } else {
      mql.addListener(update);
      return () => mql.removeListener(update);
    }
  }, [collapsible, effectiveControlled, collapseBreakpoint]);

  const handleCollapseChange = useCallback(
    (next: boolean) => {
      if (controlledCollapsed === undefined && setContextCollapsed) {
        setContextCollapsed(next);
      } else if (controlledCollapsed === undefined) {
        setInternalCollapsed(next);
      }
      onCollapsedChange?.(next);
    },
    [controlledCollapsed, setContextCollapsed, onCollapsedChange]
  );

  useEffect(() => {
    const container = document.querySelector("main");
    if (!container) return;

    const ids = items.map((item) => item.id);

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      let bestId = "";
      let maxVisible = -1;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const top = Math.max(rect.top, containerRect.top);
        const bottom = Math.min(rect.bottom, containerRect.bottom);
        const visibleHeight = Math.max(0, bottom - top);

        if (visibleHeight > maxVisible) {
          maxVisible = visibleHeight;
          bestId = id;
        }
      }

      if (bestId) {
        setActiveId(bestId);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <Sidebar
      side="right"
      collapsible={collapsible}
      collapsed={isCollapsed}
      onCollapsedChange={handleCollapseChange}
      className={cn("sticky top-0 self-start h-screen shrink-0", className)}
    >
      <div className="flex flex-col gap-surface-gap px-layout-x py-surface">
        {items.map((item) => (
          <Sidebar.Destination
            key={item.id}
            href={`#${item.id}`}
            icon={renderIcon(item.icon)}
            keep="icon"
            active={activeId === item.id}
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
          </Sidebar.Destination>
        ))}
      </div>
    </Sidebar>
  );
}
