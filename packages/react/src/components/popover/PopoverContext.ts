"use client";

import { createContext, useContext, type CSSProperties } from "react";
import type { FloatingContext, ReferenceType } from "@floating-ui/react";
import type { PopoverVariant, PopoverSize, PopoverSide, PopoverAlign } from "./types";

export interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  floatingStyles: CSSProperties;
  context: FloatingContext;
  setReference: (node: ReferenceType | null) => void;
  setFloating: (node: HTMLElement | null) => void;
  getReferenceProps: (userProps?: Record<string, unknown>) => Record<string, unknown>;
  getFloatingProps: (userProps?: Record<string, unknown>) => Record<string, unknown>;
  disabled: boolean;
  variant: PopoverVariant;
  size: PopoverSize;
  side: PopoverSide;
  align: PopoverAlign;
  offset: number;
  modal: boolean;
  dialogId: string;
}

export const PopoverContext = createContext<PopoverContextValue | null>(null);

export const usePopoverContext = (): PopoverContextValue => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover compound components must be rendered within a Popover component");
  }
  return context;
};
