"use client";

import { createContext, useContext } from "react";
import type { SidebarSide } from "./types";

export interface SidebarContextValue {
  collapsible: boolean;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  toggleCollapse: () => void;
  side: SidebarSide;
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    return {
      collapsible: false,
      collapsed: false,
      setCollapsed: () => { },
      toggleCollapse: () => { },
      side: "left",
    };
  }
  return context;
}
