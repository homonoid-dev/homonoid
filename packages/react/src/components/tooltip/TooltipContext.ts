"use client";

import { createContext, useContext, type CSSProperties } from "react";
import type {
  FloatingContext,
  ReferenceType,
} from "@floating-ui/react";
import type {
  TooltipVariant,
  TooltipSize,
  TooltipSide,
  TooltipAlign,
} from "./types";

export interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  floatingStyles: CSSProperties;
  context: FloatingContext;
  setReference: (node: ReferenceType | null) => void;
  setFloating: (node: HTMLElement | null) => void;
  getReferenceProps: (userProps?: Record<string, unknown>) => Record<string, unknown>;
  getFloatingProps: (userProps?: Record<string, unknown>) => Record<string, unknown>;
  disabled: boolean;
  variant: TooltipVariant;
  size: TooltipSize;
  side: TooltipSide;
  align: TooltipAlign;
  offset: number;
}

export const TooltipContext = createContext<TooltipContextValue | null>(null);

export const useTooltipContext = (): TooltipContextValue => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip compound components must be rendered within a Tooltip component");
  }
  return context;
};
