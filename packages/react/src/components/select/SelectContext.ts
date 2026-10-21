"use client";

import {
  createContext,
  useContext,
  type CSSProperties,
  type MutableRefObject,
  type ReactNode,
} from "react";
import type { FloatingContext, ReferenceType } from "@floating-ui/react";
import type {
  SelectColor,
  SelectRadius,
  SelectSize,
  SelectVariant,
} from "./types";

export interface SelectContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string | undefined;
  setValue: (value: string) => void;
  selectedLabel: ReactNode;
  setSelectedLabel: (label: ReactNode) => void;
  placeholder: string | undefined;
  disabled: boolean;
  invalid: boolean;
  size: SelectSize;
  radius: SelectRadius;
  variant: SelectVariant;
  color: SelectColor;
  triggerId: string;
  listboxId: string;
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
  elementsRef: MutableRefObject<Array<HTMLElement | null>>;
  labelsRef: MutableRefObject<Array<string | null>>;
  registerItem: (value: string, label: ReactNode) => () => void;
  getItemLabel: (value: string) => ReactNode;
}

export const SelectContext = createContext<SelectContextValue | null>(null);

export const useSelectContext = (): SelectContextValue => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(
      "Select compound components must be rendered within a Select component"
    );
  }
  return context;
};
