"use client";

import { createContext, useContext } from "react";
import type { EmptySize, EmptyVariant } from "./types";

export interface EmptyContextValue {
  size: EmptySize;
  variant: EmptyVariant;
}

export const EmptyContext = createContext<EmptyContextValue>({
  size: "md",
  variant: "plain",
});

export function useEmptyContext(): EmptyContextValue {
  return useContext(EmptyContext);
}

