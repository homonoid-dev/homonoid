"use client";

import {
  createContext,
  useContext,
  type ReactNode,
  type RefObject,
  type KeyboardEvent,
} from "react";
import type { Variant, Size } from "../../types";
import type {
  AccordionIndicatorPlacement,
  AccordionIndicatorConfig,
  AccordionIndicatorProp,
} from "./types";

export interface ResolvedAccordionIndicator {
  icon: ReactNode;
  placement: AccordionIndicatorPlacement;
  rotate: boolean;
}

export function resolveIndicator(
  indicator: AccordionIndicatorProp | undefined
): ResolvedAccordionIndicator | undefined {
  if (!indicator) return undefined;
  if (
    typeof indicator === "object" &&
    indicator !== null &&
    "icon" in indicator
  ) {
    const config = indicator as AccordionIndicatorConfig;
    return {
      icon: config.icon,
      placement: config.placement ?? "trailing",
      rotate: config.rotate ?? true,
    };
  }
  return {
    icon: indicator as ReactNode,
    placement: "trailing",
    rotate: true,
  };
}

export interface AccordionContextValue {
  value: string[];
  toggle: (itemValue: string) => void;
  isExpanded: (itemValue: string) => boolean;
  multiple: boolean;
  collapsible: boolean;
  variant: Variant;
  size: Size;
  disabled: boolean;
  indicator?: ResolvedAccordionIndicator;
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
