"use client";

import { createContext, useContext } from "react";

export interface AccordionItemContextValue {
  value: string;
  disabled: boolean;
  open: boolean;
  triggerId: string;
  contentId: string;
}

export const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

export function useAccordionItemContext(): AccordionItemContextValue {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      "AccordionItem compound components must be rendered within an AccordionItem."
    );
  }
  return context;
}

