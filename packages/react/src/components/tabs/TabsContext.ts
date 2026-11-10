"use client";

import { createContext, useContext, type KeyboardEvent } from "react";
import type {
  TabsColor,
  TabsOrientation,
  TabsRadius,
  TabsSize,
  TabsVariant,
} from "./types";

export interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  variant: TabsVariant;
  color: TabsColor;
  size: TabsSize;
  radius: TabsRadius;
  orientation: TabsOrientation;
  disabled: boolean;
  baseId: string;
  rovingFocus: boolean;
  handleKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs compound components must be used within a Tabs component");
  }
  return context;
}

