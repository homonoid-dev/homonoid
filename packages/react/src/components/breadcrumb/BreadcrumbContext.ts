"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { BreadcrumbSize } from "./types";

export interface BreadcrumbContextValue {
  size: BreadcrumbSize;
  separator?: ReactNode;
}

export const BreadcrumbContext = createContext<BreadcrumbContextValue>({
  size: "md",
});

export function useBreadcrumbContext(): BreadcrumbContextValue {
  return useContext(BreadcrumbContext);
}

