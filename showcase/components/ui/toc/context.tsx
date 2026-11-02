"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { TocItemModel, TocContextValue } from "./types";

export const TocContext = createContext<TocContextValue | null>(null);

export function TocProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<TocItemModel[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [collapsed, setCollapsed] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const isLockedRef = useRef(false);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/components") {
      setItems([]);
      setActiveId("");
    }
  }, [pathname]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    setActiveId(id);
    isLockedRef.current = true;
    setIsLocked(true);

    if (lockTimerRef.current) {
      clearTimeout(lockTimerRef.current);
    }

    const yOffset = -24;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });

    lockTimerRef.current = setTimeout(() => {
      isLockedRef.current = false;
      setIsLocked(false);
    }, 850);
  };

  useEffect(() => {
    if (!items || items.length === 0) return;

    setActiveId((prev) => {
      if (items.some((item) => item.id === prev)) return prev;
      return items[0]?.id ?? "";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (isLockedRef.current) return;

        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length === 0) return;

        visibleEntries.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );

        const target =
          visibleEntries.find((e) => e.boundingClientRect.top >= 0) ??
          visibleEntries[0];

        if (target) {
          setActiveId(target.target.id);
        }
      },
      {
        rootMargin: "-80px 0px -40% 0px",
        threshold: 0,
      }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
      if (lockTimerRef.current) {
        clearTimeout(lockTimerRef.current);
      }
    };
  }, [items]);

  return (
    <TocContext.Provider
      value={{
        items,
        setItems,
        activeId,
        setActiveId,
        collapsed,
        setCollapsed,
        isLocked,
        setIsLocked,
        scrollToSection,
      }}
    >
      {children}
    </TocContext.Provider>
  );
}

export function useToc(items?: TocItemModel[]) {
  const context = useContext(TocContext);
  if (!context) {
    throw new Error("useToc must be used within a TocProvider");
  }

  const { setItems } = context;

  useEffect(() => {
    if (items && items.length > 0) {
      setItems(items);
      return () => {
        setItems([]);
      };
    }
  }, [items, setItems]);

  return context;
}
