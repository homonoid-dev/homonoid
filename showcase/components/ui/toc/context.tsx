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

    let rafId: number | null = null;

    const handleScroll = () => {
      if (isLockedRef.current) return;

      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (isLockedRef.current) return;

        const readingLine = 140;
        const isNearBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 140;

        if (isNearBottom) {
          const lastId = items[items.length - 1]?.id;
          if (lastId) {
            setActiveId(lastId);
            return;
          }
        }

        let currentId = items[0]?.id ?? "";
        for (const item of items) {
          const el = document.getElementById(item.id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= readingLine) {
            currentId = item.id;
          } else {
            break;
          }
        }

        setActiveId((prev) => (prev === currentId ? prev : currentId));
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
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
