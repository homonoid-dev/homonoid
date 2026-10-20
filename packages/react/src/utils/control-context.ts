"use client";

import { createContext, useContext } from "react";
import type { Size } from "../types";

export interface ControlContextValue {
  size: Size;
  control?: "checkbox" | "switch";
}

export const ControlContext = createContext<ControlContextValue | null>(null);

export const useControlContext = (): ControlContextValue | null =>
  useContext(ControlContext);
