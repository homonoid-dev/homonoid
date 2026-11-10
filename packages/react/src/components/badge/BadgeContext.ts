"use client";

import { createContext, useContext } from "react";
import type { BadgeColor, BadgeOverlap, BadgeRadius, BadgeSize, BadgeVariant } from "./types";

export interface BadgeContextValue {
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  radius?: BadgeRadius;
  overlap?: BadgeOverlap;
}

export const BadgeContext = createContext<BadgeContextValue>({
  variant: "contained",
  color: "primary",
  size: "md",
  radius: "full",
  overlap: "rectangular",
});

export function useBadgeContext(): BadgeContextValue {
  return useContext(BadgeContext);
}

