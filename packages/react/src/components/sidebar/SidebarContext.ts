"use client";

import { createContext, useContext } from "react";
import type { TileRadius } from "../tile/types";
import type { SidebarCollapsible, SidebarSide, SidebarVariant } from "./types";

export interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  toggleCollapsed: () => void;
  collapsible: SidebarCollapsible;
  variant: SidebarVariant;
  side: SidebarSide;
  radius: TileRadius;
  sidebarId: string;
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebarContext(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "Sidebar subcomponents must be rendered within a Sidebar provider"
    );
  }
  return context;
}

