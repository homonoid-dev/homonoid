"use client";

import { createContext, useContext, type RefObject, type KeyboardEvent } from "react";
import type {
  AccordionVariant,
  AccordionColor,
  AccordionSize,
} from "./types";

export interface AccordionContextValue {
  value: string[];
  toggle: (itemValue: string) => void;
  isExpanded: (itemValue: string) => boolean;
  multiple: boolean;
  collapsible: boolean;
  variant: AccordionVariant;
  color: AccordionColor;
  size: AccordionSize;
  disabled: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  handleKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

export const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordionContext(): AccordionContextValue {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Accordion compound components must be rendered within an Accordion provider."
    );
  }
  return context;
}
