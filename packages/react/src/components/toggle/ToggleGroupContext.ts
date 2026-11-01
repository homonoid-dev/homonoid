"use client";

import { createContext, useContext, type KeyboardEvent } from "react";
import type {
  ToggleColor,
  ToggleOrientation,
  ToggleRadius,
  ToggleSize,
  ToggleType,
  ToggleVariant,
} from "./types";

export interface ToggleGroupContextValue {
  type: ToggleType;
  value: string[];
  onItemToggle: (itemValue: string) => void;
  variant?: ToggleVariant;
  color?: ToggleColor;
  size?: ToggleSize;
  radius?: ToggleRadius;
  orientation?: ToggleOrientation;
  disabled?: boolean;
  rovingFocus?: boolean;
  handleKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

export const ToggleGroupContext =
  createContext<ToggleGroupContextValue | null>(null);

export function useToggleGroupContext(): ToggleGroupContextValue | null {
  return useContext(ToggleGroupContext);
}

