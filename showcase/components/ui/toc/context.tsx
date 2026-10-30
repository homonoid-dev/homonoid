"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { TocItemModel, TocContextValue } from "./types";

export const TocContext = createContext<TocContextValue | null>(null);

export function TocProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<TocItemModel[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/components") {
      setItems([]);
    }
  }, [pathname]);

  return (
    <TocContext.Provider value={{ items, setItems, collapsed, setCollapsed }}>
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
