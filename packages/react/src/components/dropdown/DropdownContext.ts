"use client";

import {
  createContext,
  useContext,
  type CSSProperties,
  type RefObject,
} from "react";
import type { FloatingContext, ReferenceType } from "@floating-ui/react";
import type { DropdownRadius, DropdownSize } from "./types";

export interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled: boolean;
  size: DropdownSize;
  radius: DropdownRadius;
  triggerId: string;
  menuId: string;
  floatingStyles: CSSProperties;
  context: FloatingContext;
  setReference: (node: ReferenceType | null) => void;
  setFloating: (node: HTMLElement | null) => void;
  getReferenceProps: (
    userProps?: Record<string, unknown>
  ) => Record<string, unknown>;
  getFloatingProps: (
    userProps?: Record<string, unknown>
  ) => Record<string, unknown>;
  getItemProps: (
    userProps?: Record<string, unknown>
  ) => Record<string, unknown>;
  highlightedIndex: number | null;
  setHighlightedIndex: (index: number | null) => void;
  elementsRef: RefObject<Array<HTMLElement | null>>;
  labelsRef: RefObject<Array<string | null>>;
}

export const DropdownContext = createContext<DropdownContextValue | null>(null);

export function useDropdownContext(): DropdownContextValue {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      "Dropdown compound components must be rendered within a <Dropdown> provider."
    );
  }
  return context;
}
