"use client";

import { createContext, useContext, type ChangeEvent } from "react";
import type { SwitchRadius, SwitchSize } from "./types";

export interface SwitchContextValue {
  isChecked: boolean;
  disabled: boolean;
  invalid: boolean;
  size: SwitchSize;
  radius: SwitchRadius;
  inputId: string;
  labelId: string;
  descriptionId: string;
  inputRef: (element: HTMLInputElement | null) => void;
  inputProps: Record<string, unknown>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SwitchContext = createContext<SwitchContextValue | null>(null);

export function useSwitchContext(): SwitchContextValue {
  const context = useContext(SwitchContext);
  if (!context) {
    throw new Error("Switch compound components must be rendered within a <Switch> component.");
  }
  return context;
}
